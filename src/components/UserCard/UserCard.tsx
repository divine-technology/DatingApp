import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {AuthUser} from '../../apiClient';
import {styles} from './UserCard.styles';
import {ClickableSwipeCard} from '../CardSwiper/CardSwiper';
import LinearGradient from 'react-native-linear-gradient';
import {api} from '../../services/api';
import dayjs from '../../dayjs/dayjs-extended';

export type UserCardProps = {
  user: AuthUser;
  like?: () => void;
  dislike?: () => void;
  profile?: () => void;
};

export const UserCard: React.FC<UserCardProps> = ({
  user,
  like,
  dislike,
  profile
}) => {
  const [picture, setPicture] = useState();
  const [pictureDate, setPictureDate] = useState<string>();

  const getProfilePicture = async () => {
    try {
      const res = await api.axiosFetch({
        url: `/image/${user?.lastPictureTaken}`,
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        params: {
          dimensions: '300x300'
        }
      });
      setPicture(res.data.url);
      setPictureDate(res.data.createdAt);
    } catch (error) {
      // console.log({error});
    }
  };

  getProfilePicture();

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={{
          uri: picture
        }}
      />
      <View style={styles.absWrapper}>
        <View style={styles.likeDislikeWrapper}>
          <Pressable onPress={dislike} style={styles.likeDislike} />
          <Pressable onPress={like} style={styles.likeDislike} />
        </View>
        <LinearGradient
          colors={['#ffffff00', '#ffffff90']}
          locations={[0, 0.1]}
          style={{height: 150}}>
          <Pressable onPress={profile} style={styles.infoWrapper}>
            <Text style={styles.info}>
              {`${user.firstName} ${user.lastName}, ${user.age}`}
            </Text>
            <Text style={styles.bio}>
              Last picture taken {dayjs(pictureDate).fromNow()}
            </Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

export type ClickableSwipableUserCardProps = UserCardProps & ClickableSwipeCard;

export const ClickableSwipableUserCard: React.FC<
  ClickableSwipableUserCardProps
> = ({like, dislike, handleSwipeClick, ...rest}) => {
  const handleManualLike = like
    ? () => {
        handleSwipeClick ? handleSwipeClick('right') : like();
      }
    : undefined;

  const handleManualDislike = dislike
    ? () => {
        handleSwipeClick ? handleSwipeClick('left') : dislike();
      }
    : undefined;

  return (
    <UserCard {...rest} like={handleManualLike} dislike={handleManualDislike} />
  );
};
