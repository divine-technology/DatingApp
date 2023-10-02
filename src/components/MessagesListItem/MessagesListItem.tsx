import React, {useEffect, useState} from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {styles} from '../../screens/messages/Message.styles';
import {MessageResponseDto} from '../../apiClient';
import dayjs from '../../dayjs/dayjs-extended';
import * as Icons from 'react-native-heroicons/outline';
import {api} from '../../services/api';
import {ImageWithLoader} from '../Image/ImageWithLoader';

export type MessagesListItemProps = {
  authUserId: string;
  onPress: (id: string) => void;
  onLongPress?: (likeId: string, userId: string) => void;
  isBlocked?: boolean;
} & MessageResponseDto;

export const MessagesListItem: React.FC<MessagesListItemProps> = ({
  likeId,
  message,
  fromUser,
  toUser,
  createdAt,
  authUserId,
  onPress,
  onLongPress,
  isBlocked = false
}) => {
  const checkStatus = () => {
    if (isBlocked) {
      if (fromUser._id === authUserId) return toUser._id;
      else return fromUser._id;
    } else return likeId;
  };

  const getUserId = () => {
    if (fromUser._id === authUserId) return toUser._id;
    else return fromUser._id;
  };

  const [profilePicture, setProfilePicture] = useState();

  const getProfilePicture = async () => {
    try {
      const res = await api.axiosFetch({
        url: `/image/${
          fromUser._id === authUserId
            ? toUser.profilePicture
            : fromUser.profilePicture
        }`,
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        params: {
          dimensions: '300x300'
        }
      });
      setProfilePicture((res.data as any).url);
    } catch (error) {
      // console.log({error});
    }
  };

  useEffect(() => {
    getProfilePicture();
  }, [fromUser, toUser]);

  return (
    <Pressable
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={() => onPress(checkStatus())}
      onLongPress={() => onLongPress && onLongPress(likeId, getUserId())}>
      <ImageWithLoader
        style={styles.imageStyle}
        source={{
          uri: profilePicture
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
            {fromUser._id === authUserId
              ? `Me: ${message ? message : 'image'}`
              : message
              ? message
              : 'image'}
          </Text>
          <Text style={styles.dateText}>{dayjs(createdAt).fromNow()}</Text>
        </View>
      </View>
      {isBlocked && <Icons.NoSymbolIcon size={30} color={'red'} />}
    </Pressable>
  );
};
