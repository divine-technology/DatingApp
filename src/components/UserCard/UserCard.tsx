import React, {useRef, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {AuthUser} from '../../apiClient';
import {styles} from './UserCard.styles';
import {ClickableSwipeCard} from '../CardSwiper/CardSwiper';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {api} from '../../services/api';
import dayjs from '../../dayjs/dayjs-extended';
import {ImageWithLoader} from '../Image/ImageWithLoader';

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

  const imageRef = useRef<Image>(null);

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
      <ImageWithLoader
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
          {!user ? (
            <SkeletonPlaceholder backgroundColor="#d3d3d3" borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item flexDirection="row" gap={5}>
                    <SkeletonPlaceholder.Item width={120} height={30} />
                    <SkeletonPlaceholder.Item width={30} height={30} />
                  </SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={280}
                    height={10}
                  />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={300}
                    height={10}
                  />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={300}
                    height={10}
                  />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={300}
                    height={10}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          ) : (
            <Pressable onPress={profile} style={styles.infoWrapper}>
              <Text style={styles.info}>
                {`${user.firstName} ${user.lastName}, ${user.age}`}
              </Text>
              <Text style={styles.bio}>{user.bio}</Text>
            </Pressable>
          )}
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
