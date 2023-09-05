import React, {useContext, useEffect, useState} from 'react';
import {
  MessagesStackCompositeScreenProps,
  MessagesStackScreenProps
} from '../../navigation/MessagesRoutes';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  Send,
  SendProps
} from 'react-native-gifted-chat';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';
import * as Icons from 'react-native-heroicons/solid';
import {Pressable} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {openApi} from '../../services/openApi';
import {AuthContext} from '../../providers/context/Auth';

export type ChatScreenProps = {likeId: string};

const ChatToolbar: React.FC<InputToolbarProps<IMessage>> = props => {
  return (
    <InputToolbar
      {...props}
      primaryStyle={{flex: 1}}
      containerStyle={{
        flex: 1,
        flexDirection: 'row-reverse',
        paddingHorizontal: 8,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF70',
        borderRadius: 24,
        marginBottom: 8
      }}
      accessoryStyle={{justifyContent: 'center', height: '100%'}}
    />
  );
};

const SendButton: React.FC<SendProps<IMessage>> = props => {
  return (
    <Send
      {...props}
      containerStyle={{justifyContent: 'center', height: '100%'}}>
      <Icons.PaperAirplaneIcon size={25} color={'#b13ef7'} />
    </Send>
  );
};

type AccessoriesProps = {
  onCameraPress: () => void;
} & InputToolbarProps<IMessage>;

const Accessories: React.FC<AccessoriesProps> = ({onCameraPress}) => {
  return (
    <Pressable
      onPress={onCameraPress}
      style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}>
      <Icons.CameraIcon size={25} color={'#b13ef7'} />
    </Pressable>
  );
};

export const ChatScreen: React.FC<
  MessagesStackCompositeScreenProps<'Chat'>
> = ({route, navigation}) => {
  const {likeId} = route.params;

  const {user} = useContext(AuthContext);

  const {data} = useQuery(
    ['chat', likeId],
    () =>
      openApi.instance.message.messageControllerGetConversation({
        likeId
      }),
    {
      refetchInterval: 1000
    }
  );

  const navigateToProfile = (id: string | number) => {
    navigation.navigate('App', {
      screen: 'HomeStack',
      params: {screen: 'UserProfile', params: {userId: id.toString()}}
    });
  };

  const {data: newMessage, mutate} = useMutation(
    ['last-message'],
    (message: string, image?: string) =>
      openApi.instance.message.messageControllerSendMessage({
        likeId,
        requestBody: {
          message
        }
      }),
    {onSuccess: data => console.log({data})}
  );

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (data || newMessage) {
      setMessages(data?.data as unknown as IMessage[]);
    }
  }, [data, newMessage]);

  return (
    <ScreenView>
      <GiftedChat
        user={{
          _id: user?._id ?? '',
          name: `${user?.firstName} ${user?.lastName}`,
          avatar:
            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
        }}
        messages={messages}
        textInputProps={{
          flex: 1,
          selectionColor: '#b13ef7',
          paddingTop: 8,
          autoCorrect: false,
          marginRight: 8
        }}
        listViewProps={{
          showsVerticalScrollIndicator: false
        }}
        onPressAvatar={messageUser => navigateToProfile(messageUser._id)}
        onSend={messages => mutate(messages[0].text)}
        renderAccessory={Accessories}
        renderSend={SendButton}
        renderInputToolbar={ChatToolbar}
      />
    </ScreenView>
  );
};
