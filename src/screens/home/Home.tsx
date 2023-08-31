import React, {useState} from 'react';
import {
  PermissionsAndroid,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Platform,
} from 'react-native';
import {EndpointEnum} from '../../services/endpoints';
import {useQuery} from '../../services/useQuery';
import {AppBottomTabScreenProps} from '../../Navigation/AppRoutes';
import Modal from 'react-native-modal';

import ImagePicker from 'react-native-image-crop-picker';

export type HomeRouteParams = {};

export const HomeScreen: React.FC<AppBottomTabScreenProps<'Home'>> = () => {
  const {data, error, status} = useQuery(EndpointEnum.getAllPokemonPaginated);

  console.log({data}, {error}, {status});
  const [isModalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={isModalVisible}
        backdropColor="transparent"
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="left"
        onBackdropPress={() => setModalVisible(!isModalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Take a selfie?</Text>
            <Text style={styles.modalText}>
              Selfie required in order to start a conversation.
            </Text>
            <View style={styles.buttonsWrapper}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  if (Platform.OS === 'android') {
                    requestCameraPermission();
                  }
                  open();
                }}>
                <Text style={styles.textStyle}>Selfie</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => setModalVisible(!isModalVisible)}>
                <Text style={styles.textStyle}>Exit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonsWrapper: {
    width: '100%',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
