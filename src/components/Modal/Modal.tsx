import React from 'react';
import {View, Text} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import * as Icons from 'react-native-heroicons/outline';
import {Button} from '../Button/Button';
import {styles} from './Modal.styles';

type CustomModalProps = Partial<ModalProps> & {
  headerIcon?: React.ReactElement;
  headerText?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonOnPress: () => void;
  secondaryButtonOnPress: () => void;
};

export const CustomModal: React.FC<CustomModalProps> = ({
  headerIcon,
  headerText,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonOnPress,
  secondaryButtonOnPress,
  ...rest
}) => {
  return (
    <Modal {...rest}>
      <View style={styles.container}>
        {headerIcon ? (
          headerIcon
        ) : (
          <Icons.ShieldExclamationIcon size={100} color={'red'} />
        )}
        <Text style={styles.headerText}>
          {headerText ? headerText : 'Confirm action'}
        </Text>
        <View style={styles.buttonsContainer}>
          <View style={{flex: 1}}>
            <Button
              text={
                secondaryButtonText ? secondaryButtonText : 'No, take me back'
              }
              variant={'outlined'}
              shape={'rectangle'}
              onPress={secondaryButtonOnPress}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              text={primaryButtonText ? primaryButtonText : 'Yes, I am sure'}
              variant={'filled'}
              shape={'rectangle'}
              onPress={primaryButtonOnPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
