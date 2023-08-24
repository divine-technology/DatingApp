import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {UserWithId} from '../../apiClient';

export type UserCardProps = {
  user: UserWithId;
  like: () => void;
  dislike: () => void;
  profile: () => void;
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  like,
  dislike,
  profile,
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 24,
        overflow: 'hidden',
      }}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={{
          uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 64,
          }}>
          <Pressable
            onPress={dislike}
            style={{flex: 1, backgroundColor: 'red'}}
          />
          <Pressable
            onPress={like}
            style={{flex: 1, backgroundColor: 'blue'}}
          />
        </View>
        <Pressable
          onPress={profile}
          style={{
            padding: 8,
            backgroundColor: '#FFFFFF80',
          }}>
          <Text style={{fontSize: 30, color: 'black'}}>
            {`${user.firstName} ${user.lastName}${user.age ? ',' : ''} ${
              user.age ? user.age : ''
            }`}
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: 'black',
            }}>
            {user.bio}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
