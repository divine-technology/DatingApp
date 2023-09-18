import React, {useContext, useRef, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Button} from '../../components/Button/Button';
import {
  MessagesStackCompositeScreenProps,
  MessagesStackScreenProps
} from '../../navigation/MessagesRoutes';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import {useMutation} from 'react-query';
import {openApi} from '../../services/openApi';
import {MessageResponseDto, ResponsePaginateDto} from '../../apiClient';
import {styles} from './Message.styles';
import {AuthContext} from '../../providers/context/Auth';
import {MessagesListItem} from '../../components/MessagesListItem/MessagesListItem';
import {useFocusEffect} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import * as Icons from 'react-native-heroicons/outline';
import {themeColors} from '../../themes/colors';
import {CustomModal} from '../../components/Modal/Modal';

export const MessagesScreen: React.FC<
  MessagesStackCompositeScreenProps<'Messages'>
> = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [fetchedMessages, setfetchedMessages] = useState<MessageResponseDto[]>(
    []
  );
  const [currentLikeId, setCurrentLikeId] = useState<string>();
  const [currentUserId, setCurrentUserId] = useState<string>();
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const modalizeRef = useRef<Modalize>(null);

  const {data: _data, mutate: getChats} = useMutation<
    unknown,
    unknown,
    unknown
  >(
    'getChats',
    _data => {
      return openApi.instance.message.messageControllerGetChat({});
    },
    {
      onSuccess: data => {
        console.log({data});
        setfetchedMessages(
          (data as unknown as ResponsePaginateDto)
            .data as unknown as MessageResponseDto[]
        );
      },
      onError: () => {}
    }
  );

  const {data, mutate: blockUser} = useMutation<unknown, unknown, unknown>(
    'blockUser',
    _data => {
      return openApi.instance.like.likeControllerBlockByLikeId({
        likeId: currentLikeId!!.toString()
      });
    },
    {
      onSuccess: () => {
        getChats({});
      },
      onError: () => {}
    }
  );

  useFocusEffect(React.useCallback(() => getChats(undefined), []));

  const openChat = (likeId: string) => {
    navigation.navigate('Chat', {likeId});
  };

  const openModalize = (likeId: string, userId: string) => {
    setCurrentLikeId(likeId);
    setCurrentUserId(userId);
    modalizeRef.current?.open();
  };

  const openBlockConfirmation = () => {
    modalizeRef.current?.close();
    setModalVisibility(true);
  };

  const navigateToUserProfile = () => {
    navigation.navigate('App', {
      screen: 'HomeStack',
      params: {
        screen: 'UserProfile',
        params: {userId: currentUserId!!.toString()}
      }
    });
  };

  return (
    <ScreenView>
      <View style={styles.container}>
        <FlatList
          data={fetchedMessages}
          contentContainerStyle={{gap: 8}}
          keyExtractor={message => message._id}
          ListHeaderComponent={() => (
            <View style={styles.upperContainer}>
              <Text style={styles.h2TextStyle}>Messsages</Text>
              <View>
                <Button
                  text="Like Requests"
                  variant={'text'}
                  size={'xxs'}
                  textStyle={{
                    fontWeight: '500',
                    fontSize: 18
                  }}
                  onPress={() => navigation.navigate('LikeRequests')}
                />
              </View>
            </View>
          )}
          renderItem={({item}) => (
            <MessagesListItem
              {...item}
              authUserId={user?._id ?? ''}
              onPress={likeId => openChat(likeId)}
              onLongPress={(likeId, userId) => openModalize(likeId, userId)}
            />
          )}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        modalHeight={260}
        overlayStyle={{backgroundColor: '#00000040'}}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            alignItems: 'center',
            padding: 12
          }}>
          <Icons.ChatBubbleBottomCenterTextIcon
            size={100}
            color={themeColors.primaryColor}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              fontWeight: '400',
              textAlign: 'center',
              paddingHorizontal: 24
            }}>
            What would you like to do?
          </Text>
          <View style={{flexDirection: 'row', gap: 10, marginTop: 18}}>
            <View style={{flex: 1}}>
              <Button
                text="View Profile"
                variant="outlined"
                shape="rectangle"
                onPress={() => navigateToUserProfile()}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                text="Block User"
                variant="filled"
                shape="rectangle"
                onPress={() => openBlockConfirmation()}
              />
            </View>
          </View>
        </View>
      </Modalize>
      <CustomModal
        headerIcon={<Icons.ShieldExclamationIcon size={100} color={'red'} />}
        headerText={'Are you sure you want to block this user?'}
        isVisible={modalVisibility}
        onBackButtonPress={() => setModalVisibility(false)}
        onBackdropPress={() => setModalVisibility(false)}
        backdropOpacity={0.4}
        useNativeDriver={true}
        primaryButtonOnPress={() => {
          setModalVisibility(false);
          blockUser({});
        }}
        secondaryButtonOnPress={() => setModalVisibility(false)}
      />
    </ScreenView>
  );
};
