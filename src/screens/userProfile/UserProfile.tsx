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

export type UserProfileScreenProps = {
  userId: string;
};

export const UserProfileScreen: React.FC<
  HomeStackScreenProps<'UserProfile'>
> = ({route}) => {
  const {userId} = route.params;

  const {data} = useQuery(['chat', userId], () =>
    openApi.instance.user.usersControllerGetOneUser({
      id: userId
    })
  );

  const [user, setUser] = useState<AuthUser>();
  const [visible, setIsVisible] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setUser(data as unknown as AuthUser);
    }
  }, [data]);

  const insets = useSafeAreaInsets();

  const images = [
    {
      uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4'
    },
    {
      uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34'
    },
    {
      uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111'
    }
  ];

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
        <Image
          style={styles.userImg}
          source={{
            uri: 'https://media.istockphoto.com/id/1329031407/photo/young-man-with-backpack-taking-selfie-portrait-on-a-mountain-smiling-happy-guy-enjoying.jpg?s=612x612&w=0&k=20&c=WvjAEx3QlWoAn49drp0N1vmxAgGObxWDpoXtaU2iB4Q='
          }}
        />
        <Text style={styles.userName}>
          {user ? `${user.firstName} ${user.lastName}` : 'Test User'}
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
          title={user && user?.gender ? user.gender : 'Not set'}
          subTitle={'Gender'}
        />
        <InfoContainer
          title={user && user?.age ? user.age.toString() : 'Not set'}
          subTitle={'Age'}
        />
        <InfoContainer
          title={user && user?.preference ? user.preference : 'Not set'}
          subTitle={'Preference'}
        />
      </View>
      <View style={{marginBottom: 4}}>
        <InfoContainer
          title={'Bio'}
          subTitle={user && user.bio ? user.bio : 'No user bio.'}
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
            {images.map((uri, index) => (
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
                <Image
                  source={uri}
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
        images={images}
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
