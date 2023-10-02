import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, FlatList, ScrollView} from 'react-native';
import {Button} from '../../components/Button/Button';
import {MessagesStackScreenProps} from '../../navigation/MessagesRoutes';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {MessageResponseDto, ResponsePaginateDto} from '../../apiClient';
import {AuthContext} from '../../providers/context/Auth';
import dayjs from '../../dayjs/dayjs-extended';
import {MessagesListItem} from '../../components/MessagesListItem/MessagesListItem';
import {styles} from './LikeRequests.styles';

export const LikeRequestsScreen: React.FC<
  MessagesStackScreenProps<'LikeRequests'>
> = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const {data, mutate: getChats} = useMutation<unknown, unknown, unknown>(
    'getLikeRequestChats',
    _data => {
      return openApi.instance.message.messageControllerGetLikeRequestChats({});
    },
    {
      // onSuccess: data => {
      //   setfetchedMessages(
      //     (data as unknown as ResponsePaginateDto)
      //       .data as unknown as MessageResponseDto[]
      //   );
      // },
      onError: () => {}
    }
  );

  useEffect(() => {
    getChats(undefined);
  }, []);

  const openChat = (likeId: string) => {
    navigation.navigate('ChatRequests', {likeId});
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.h2TextStyle}>Like Requests</Text>
          <View style={{}}>
            <Button
              text="Messages"
              variant={'text'}
              size={'xxs'}
              textStyle={{
                fontWeight: '500',
                fontSize: 18
              }}
              onPress={() => navigation.navigate('Messages')}
            />
          </View>
        </View>
        <FlatList
          data={
            ((data as unknown as ResponsePaginateDto)
              ?.data as unknown as MessageResponseDto[]) ?? []
          }
          contentContainerStyle={{gap: 8}}
          renderItem={({item}) => (
            <MessagesListItem
              {...item}
              authUserId={user?._id ?? ''}
              onPress={likeId => openChat(likeId)}
            />
          )}
        />
      </View>
    </ScreenView>
  );
};
