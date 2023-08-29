import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {AuthUser} from '../../apiClient';
import {styles} from './UserCard.styles';
import {ClickableSwipeCard} from '../CardSwiper/CardSwiper';
import LinearGradient from 'react-native-linear-gradient';

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
  console.log('USER BIO: ', user.bio);
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
        }}
      />
      <View style={styles.absWrapper}>
        <View style={styles.likeDislikeWrapper}>
          <Pressable onPress={dislike} style={styles.likeDislike} />
          <Pressable onPress={like} style={styles.likeDislike} />
        </View>
        <LinearGradient
          colors={['transparent', '#ffffff90']}
          locations={[0, 1]}
          style={{height: 150}}>
          <Pressable onPress={profile} style={styles.infoWrapper}>
            <Text style={styles.info}>
              {`${user.firstName} ${user.lastName}, ${user.age}`}
            </Text>
            <Text style={styles.bio}>
              {user.bio}
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </Text>
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
