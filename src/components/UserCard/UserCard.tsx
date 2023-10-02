import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {AuthUser} from '../../apiClient';
import {styles} from './UserCard.styles';
import {ClickableSwipeCard} from '../CardSwiper/CardSwiper';
import LinearGradient from 'react-native-linear-gradient';
<<<<<<< HEAD
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
=======
import {api} from '../../services/api';
import dayjs from '../../dayjs/dayjs-extended';
>>>>>>> main

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
<<<<<<< HEAD
      {!user ? (
        <View style={styles.image}>
          <SkeletonPlaceholder backgroundColor="#d3d3d3" borderRadius={6}>
            <SkeletonPlaceholder.Item alignItems="center">
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={'100%'}
                borderRadius={24}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: 'https://media.istockphoto.com/id/1329031407/photo/young-man-with-backpack-taking-selfie-portrait-on-a-mountain-smiling-happy-guy-enjoying.jpg?s=612x612&w=0&k=20&c=WvjAEx3QlWoAn49drp0N1vmxAgGObxWDpoXtaU2iB4Q='
          }}
        />
      )}
=======
      <Image
        style={styles.image}
        source={{
          uri: picture
        }}
      />
>>>>>>> main
      <View style={styles.absWrapper}>
        <View style={styles.likeDislikeWrapper}>
          <Pressable onPress={dislike} style={styles.likeDislike} />
          <Pressable onPress={like} style={styles.likeDislike} />
        </View>
        <LinearGradient
          colors={['#ffffff00', '#ffffff90']}
          locations={[0, 0.1]}
          style={{height: 150}}>
<<<<<<< HEAD
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
              <Text style={styles.bio}>
                {user.bio}
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </Text>
            </Pressable>
          )}
=======
          <Pressable onPress={profile} style={styles.infoWrapper}>
            <Text style={styles.info}>
              {`${user.firstName} ${user.lastName}, ${user.age}`}
            </Text>
            <Text style={styles.bio}>
              Last picture taken {dayjs(pictureDate).fromNow()}
            </Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </Pressable>
>>>>>>> main
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
