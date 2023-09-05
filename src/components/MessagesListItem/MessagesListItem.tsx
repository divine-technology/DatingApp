import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {styles} from '../../screens/messages/Message.styles';
import {MessageResponseDto} from '../../apiClient';
import dayjs from '../../dayjs/dayjs-extended';

export type MessagesListItemProps = {
  authUserId: string;
  onPress: (id: string) => void;
} & MessageResponseDto;

export const MessagesListItem: React.FC<MessagesListItemProps> = ({
  _id,
  likeId,
  message,
  fromUser,
  toUser,
  createdAt,
  authUserId,
  onPress
}) => {
  return (
    <Pressable style={{flexDirection: 'row'}} onPress={() => onPress(likeId)}>
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
    </Pressable>
  );
};
