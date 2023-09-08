import React, {useContext, useEffect, useState} from 'react';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {View, Text, FlatList} from 'react-native';
import {Button} from '../../components/Button/Button';
import {MessagesListItem} from '../../components/MessagesListItem/MessagesListItem';
import {AuthContext} from '../../providers/context/Auth';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {MessageResponseDto, ResponsePaginateDto} from '../../apiClient';
import {SettingsStackScreenProps} from '../../navigation/SettingsRoutes';
import {styles} from './BlockedUsers.styles';
import Modal from 'react-native-modal';
import * as Icons from 'react-native-heroicons/outline';
import {CustomModal} from '../../components/Modal/Modal';

export type BlockedRouteParams = undefined;

export const BlockedUsersScreen: React.FC<
  SettingsStackScreenProps<'BlockedUsers'>
> = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [fetchedMessages, setfetchedMessages] = useState<MessageResponseDto[]>(
    []
  );

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const {data, mutate: getChats} = useMutation<unknown, unknown, unknown>(
    'getChats',
    _data => {
      return openApi.instance.message.messageControllerGetBlockedChats({});
    },
    {
      onSuccess: data => {
        setfetchedMessages(
          (data as unknown as ResponsePaginateDto)
            .data as unknown as MessageResponseDto[]
        );
      },
      onError: () => {}
    }
  );

  useEffect(() => {
    getChats(undefined);
  }, []);

  const unBlockUser = (likeId: string) => {
    setModalVisibility(true);
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        <Text style={styles.h2TextStyle}>Blocked Users</Text>
        <FlatList
          data={fetchedMessages}
          contentContainerStyle={{gap: 8}}
          renderItem={({item}) => (
            <MessagesListItem
              {...item}
              authUserId={user?._id ?? ''}
              isBlocked={true}
              onPress={likeId => unBlockUser(likeId)}
              onLongPress={() =>
                console.log('Pressed but nothing should happen!')
              }
            />
          )}
        />
      </View>
      <CustomModal
        headerIcon={<Icons.ShieldExclamationIcon size={100} color={'red'} />}
        headerText={'Are you sure you want to unblock this user?'}
        isVisible={modalVisibility}
        onBackButtonPress={() => setModalVisibility(false)}
        onBackdropPress={() => setModalVisibility(false)}
        backdropOpacity={0.4}
        useNativeDriver={true}
        primaryButtonOnPress={() => console.log('TEST')}
        secondaryButtonOnPress={() => setModalVisibility(false)}
      />
    </ScreenView>
  );
};
