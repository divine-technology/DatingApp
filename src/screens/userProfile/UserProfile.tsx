import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import * as Icons from 'react-native-heroicons/outline';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {styles} from './UserProfile.styles';
import {HomeStackScreenProps} from '../../navigation/HomeRoutes';
import {useQuery} from 'react-query';
import {openApi} from '../../services/openApi';
import {AuthUser} from '../../apiClient';
import {Section} from '../../components/Section/Section';
import {InfoContainer} from '../../components/InfoContainer/InfoContainer';
import ImageView from 'react-native-image-viewing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {api} from '../../services/api';
import {ImageWithLoader} from '../../components/Image/ImageWithLoader';

export type UserProfileScreenProps = {
  userId: string;
};

export const UserProfileScreen: React.FC<
  HomeStackScreenProps<'UserProfile'>
> = ({route}) => {
  const {userId} = route.params;

  const {data} = useQuery(['user', userId], () =>
    openApi.instance.user.usersControllerGetOneUser({
      id: userId
    })
  );

  const [visible, setIsVisible] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const insets = useSafeAreaInsets();

  const [profilePicture, setProfilePicture] = useState();

  const getProfilePicture = async () => {
    try {
      const res = await api.axiosFetch({
        url: `/image/${(data as unknown as AuthUser)?.profilePicture}`,
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        params: {
          dimensions: '300x300'
        }
      });
      setProfilePicture(res.data.url);
    } catch (error) {
      // console.log({error});
    }
  };

  useEffect(() => {
    getProfilePicture();
  }, [data]);

  return (
    <ScreenView scrollEnabled>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2
        }}>
        <ImageWithLoader
          style={styles.userImg}
          source={{
            uri: profilePicture
          }}
        />
        <Text style={styles.userName}>
          {(data as unknown as AuthUser)
            ? `${(data as unknown as AuthUser).firstName} ${
                (data as unknown as AuthUser).lastName
              }`
            : 'Test User'}
        </Text>
        <Text style={styles.aboutUser}>Location incoming.</Text>
      </View>
      <View style={{marginBottom: 4}}>
        <Section color={'#24355f'}>
          <Icons.UserCircleIcon size={25} color={'#24355f'} />
        </Section>
      </View>
      <View style={{flex: 1, flexDirection: 'row', gap: 4, marginBottom: 4}}>
        <InfoContainer
          title={
            (data as unknown as AuthUser) &&
            (data as unknown as AuthUser)?.gender
              ? (data as unknown as AuthUser).gender
              : 'Not set'
          }
          subTitle={'Gender'}
        />
        <InfoContainer
          title={
            (data as unknown as AuthUser) && (data as unknown as AuthUser)?.age
              ? (data as unknown as AuthUser).age.toString()
              : 'Not set'
          }
          subTitle={'Age'}
        />
        <InfoContainer
          title={
            (data as unknown as AuthUser) &&
            (data as unknown as AuthUser)?.preference
              ? (data as unknown as AuthUser).preference
              : 'Not set'
          }
          subTitle={'Preference'}
        />
      </View>
      <View style={{marginBottom: 4}}>
        <InfoContainer
          title={'Bio'}
          subTitle={
            (data as unknown as AuthUser) && (data as unknown as AuthUser).bio
              ? (data as unknown as AuthUser).bio
              : 'No user bio.'
          }
        />
      </View>
      <View style={{marginBottom: 4}}>
        <InfoContainer title={'Images'}>
          <View
            style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row'
            }}>
            {data?.data?.gallery?.map((uri, index) => (
              <TouchableHighlight
                key={index}
                style={{
                  borderColor: '#fb5b5a90',
                  borderWidth: 1
                }}
                onPress={() => {
                  setImageIndex(index);
                  setIsVisible(!visible);
                }}>
                <ImageWithLoader
                  source={{uri}}
                  resizeMode="stretch"
                  style={{
                    width: (Dimensions.get('screen').width - 56) / 3,
                    height: (Dimensions.get('screen').width - 56) / 3
                  }}
                />
              </TouchableHighlight>
            ))}
          </View>
        </InfoContainer>
      </View>
      <ImageView
        images={data?.data?.gallery?.map(image => ({uri: image}))}
        presentationStyle="fullScreen"
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={({imageIndex}) => (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              paddingBottom: insets.bottom + 4
            }}>
            <Text style={styles.text}>{`${imageIndex + 1} / ${
              images.length
            }`}</Text>
          </View>
        )}
      />
    </ScreenView>
  );
};
