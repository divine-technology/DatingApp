import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {styles} from '../../screens/messages/Message.styles';
import {MessageResponseDto} from '../../apiClient';
import dayjs from '../../dayjs/dayjs-extended';
import * as Icons from 'react-native-heroicons/outline';

export type MessagesListItemProps = {
  authUserId: string;
  onPress: (id: string) => void;
  isBlocked?: boolean;
} & MessageResponseDto;

export const MessagesListItem: React.FC<MessagesListItemProps> = ({
  _id,
  likeId,
  message,
  fromUser,
  toUser,
  createdAt,
  authUserId,
  onPress,
  isBlocked = false,
}) => {

  const checkStatus = () => {
    if(isBlocked){
      if(fromUser._id === authUserId) return toUser._id
      else return fromUser._id
    } else return likeId
  }

  return (
    <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => onPress(checkStatus())}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
        }}
      />
      <View style={styles.textMessageContainter}>
        <Text style={styles.userNameText}>
          {fromUser._id === authUserId
            ? `${toUser.firstName} ${toUser.lastName}`
            : `${fromUser.firstName} ${fromUser.lastName}`}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={styles.messageText}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {fromUser._id === authUserId ? `Me: ${message}` : message}
          </Text>
          <Text style={styles.dateText}>{dayjs(createdAt).fromNow()}</Text>
        </View>
      </View>
      {isBlocked && <Icons.NoSymbolIcon size={30} color={'red'}/>}
    </Pressable>
  );
};
