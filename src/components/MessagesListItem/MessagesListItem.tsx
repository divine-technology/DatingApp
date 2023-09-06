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
  isBlocked = false
}) => {
  const checkStatus = () => {
    if (isBlocked) {
      if (fromUser._id === authUserId) return toUser._id;
      else return fromUser._id;
    } else return likeId;
  };

  return (
    <Pressable
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={() => onPress(checkStatus())}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: 'https://media.istockphoto.com/id/1329031407/photo/young-man-with-backpack-taking-selfie-portrait-on-a-mountain-smiling-happy-guy-enjoying.jpg?s=612x612&w=0&k=20&c=WvjAEx3QlWoAn49drp0N1vmxAgGObxWDpoXtaU2iB4Q='
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
      {isBlocked && <Icons.NoSymbolIcon size={30} color={'red'} />}
    </Pressable>
  );
};
