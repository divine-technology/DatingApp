import React, {useContext, useEffect, useState} from 'react';
import {MessagesStackCompositeScreenProps} from '../../navigation/MessagesRoutes';
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
import {PermissionsAndroid, Platform, Pressable} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {openApi} from '../../services/openApi';
import {AuthContext} from '../../providers/context/Auth';
import ImagePicker from 'react-native-image-crop-picker';

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
      <Icons.PaperAirplaneIcon size={25} color={'#fb5b5a'} />
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
      <Icons.CameraIcon size={25} color={'#fb5b5a'} />
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

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Change Profile Picture',
          message:
            'The app needs permission to access your camera ' +
            'Would you like to grant permission?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = () => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      useFrontCamera: true
    }).then(image => {
      if (image) {
        console.log('Swipe right', image);
      }
    });
  };

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
          selectionColor: '#fb5b5a',
          color: 'black',
          paddingTop: 8,
          autoCorrect: false,
          marginRight: 8
        }}
        listViewProps={{
          showsVerticalScrollIndicator: false
        }}
        onPressAvatar={messageUser => navigateToProfile(messageUser._id)}
        onSend={messages => mutate(messages[0].text)}
        renderAccessory={props => (
          <Accessories {...props} onCameraPress={openCamera} />
        )}
        renderSend={SendButton}
        renderInputToolbar={ChatToolbar}
      />
    </ScreenView>
  );
};
