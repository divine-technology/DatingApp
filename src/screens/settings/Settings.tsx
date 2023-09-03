import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageSourcePropType,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {AuthContext} from '../../providers/context/Auth';
import {Button} from '../../components/Button/Button';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './Settings.styles';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';
import * as Icons from 'react-native-heroicons/outline';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import Gallery from 'react-native-awesome-gallery';
import AwesomeGallery, {
  GalleryRef,
  RenderItemInfo
} from 'react-native-awesome-gallery';
import ImageView from 'react-native-image-viewing';

export type SettingsRouteParams = undefined;

const renderItem = ({item}: RenderItemInfo<{uri: string}>) => {
  return (
    <Image
      source={item as ImageSourcePropType}
      style={{
        width: '100%',
        height: '100%'
        // justifyContent: 'center'
        // alignItems: 'center'
      }}
      resizeMode="contain"
    />
  );
};

const images = [
  require('../../images/chat.png'),
  require('../../images/Button.png'),
  require('../../images/Button.png')
];

const {height} = Dimensions.get('window');

export const SettingsScreen: React.FC<SettingsStackScreenProps<'Settings'>> = ({
  navigation
}) => {
  const {getMe, signOut, user} = useContext(AuthContext);
  const isFocused = useIsFocused();
  const gallery = useRef<GalleryRef>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [infoVisible, setInfoVisible] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }
  }, [isFocused]);

  const onTap = () => {
    StatusBar.setHidden(infoVisible, 'slide');
    setInfoVisible(!infoVisible);
  };

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

  const [visible, setIsVisible] = useState(true);

  return (
    <ScreenView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
          }}
        />
        <Text style={styles.userName}>
          {user ? `${user.firstName} ${user.lastName}` : 'Test User'}
        </Text>
        <Text style={styles.aboutUser}>Short bio incoming.</Text>
        <View style={styles.userBtnWrapper}>
          <View style={{flex: 1}}>
            <Button
              text="Edit"
              variant={'outlined'}
              onPress={() => {
                navigation.navigate('EditUser');
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              text="Logout"
              variant={'outlined'}
              onPress={() => signOut()}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <Icons.UserCircleIcon size={25} color={'#00000095'} />
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {user && user?.gender ? user.gender : 'Not set'}
            </Text>
            <Text style={styles.userInfoSubTitle}>Gender</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {user && user?.age ? user.age : 'Not set'}
            </Text>
            <Text style={styles.userInfoSubTitle}>Age</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>
              {user && user?.preference ? user.preference : 'Not set'}
            </Text>
            <Text style={styles.userInfoSubTitle}>Preference</Text>
          </View>
        </View>
        <View style={styles.biocontainer}>
          <Text style={styles.bioTitle}>Bio</Text>
          <Text style={styles.bioSubTitle}>
            {user && user.bio ? user.bio : 'No user bio.'}
          </Text>
        </View>
        {/* <AwesomeGallery
          ref={gallery}
          data={images}
          style={{
            backgroundColor: 'orange',
            width: '100%',
            height: 500
          }}
          keyExtractor={item => item.uri}
          renderItem={renderItem}
          initialIndex={0}
          disableVerticalSwipe
          emptySpaceWidth={1}
          doubleTapInterval={150}
          onIndexChange={newIndex => {
            console.log(newIndex);
          }}
        /> */}
        {/* <Gallery
          data={images}
          style={{
            backgroundColor: 'orange',
            flex: 1,
            flexDirection: 'row',
            width: '100%'
          }}
          // renderItem={renderItem}
          onIndexChange={newIndex => {
            console.log(newIndex);
          }}
        /> */}
        <View style={styles.container}>
          {images.map((uri, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setIsVisible(!visible)}>
              <Image
                source={require('../../images/chat.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30
                }}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
        <ImageView
          images={images}
          FooterComponent={() => (
            <View
              style={{
                width: '100%',
                height: 100,
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }}>
              <TouchableOpacity>
                <Text style={{color: 'white', fontSize: 18}}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{color: 'white', fontSize: 18}}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
          presentationStyle="fullScreen"
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
        <Text style={styles.userName}>Images (to be added...)</Text>
      </ScrollView>
    </ScreenView>
  );
};
