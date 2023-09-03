import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Platform,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

interface SimpleModalProps {
  isModalVisible: boolean;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({isModalVisible}) => {
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(isModalVisible);

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
    <Modal
      isVisible={isVisibleModal}
      backdropColor="transparent"
      onSwipeComplete={() => setIsVisibleModal(false)}
      swipeDirection="left"
      onBackdropPress={() => setIsVisibleModal(!isVisibleModal)}>
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
              onPress={() => setIsVisibleModal(!isVisibleModal)}>
              <Text style={styles.textStyle}>Exit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
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
