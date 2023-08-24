import React from 'react';
import {UserWithId} from '../../apiClient';
import {UserCard} from '../UserCard/UserCard';

export type CardSwiperProps = {
  users: UserWithId[];
  like: (id: string) => void;
  dislike: () => void;
  profile: () => void;
};

export const CardSwiper: React.FC<CardSwiperProps> = ({
  users,
  like,
  dislike,
  profile,
}) => {
  console.log('users: ', users);
  return (
    <UserCard
      user={users[0]}
      like={() => like(users[0]._id.toString())}
      dislike={dislike}
      profile={profile}
    />
  );
};
