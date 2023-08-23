import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Modal,
} from 'react-native';
import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery';
import {AppBottomTabScreenProps} from '../../Navigation/AppRoutes';
import {
  Camera,
  CameraDeviceFormat,
  PhotoFile,
  useCameraDevices,
} from 'react-native-vision-camera';
import ImagePicker from 'react-native-image-crop-picker';

export type HomeRouteParams = {};

export const HomeScreen: React.FC<AppBottomTabScreenProps<'Home'>> = () => {
  const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);

  console.log({data}, {error}, {status});
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const camera = useRef<any>(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Change Profile Picture',
          message:
            'The app needs permission to access your camera or photo gallery ' +
            'to change your profile picture. Would you like to grant permission?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('eeee');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const open = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      useFrontCamera: true,
    }).then(image => {
      console.log(image);
    });
  };

  const onMediaCaptured = useCallback((media: PhotoFile) => {
    console.log(`Media captured! ${JSON.stringify(media)}`);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>Home</Text>
      <Button
        title="Show modal"
        onPress={() => {
          if (Platform.OS === 'android') {
            requestCameraPermission();
          }
          open();
        }}
      />

      <Modal
        transparent
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animationType="slide"
        visible={isModalVisible}>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            margin: 20,
            overflow: 'hidden',
            position: 'relative',
          }}>
          {device && (
            <Camera
              style={StyleSheet.absoluteFillObject}
              device={device}
              photo={true}
              isActive={true}
              frameProcessorFps={5}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              padding: 2,
              alignItems: 'flex-end',
              justifyContent: 'space-around',
            }}>
            <TouchableHighlight
              style={{padding: 10, borderRadius: 30, backgroundColor: 'white'}}
              onPress={() => onMediaCaptured}>
              <Text style={{color: 'black'}}>Capture</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{padding: 10, borderRadius: 30, backgroundColor: 'white'}}
              onPress={toggleModal}>
              <Text style={{color: 'black'}}>Exit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};
