import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
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
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  TextInput,
  View
} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {openApi} from '../../services/openApi';
import {AuthContext} from '../../providers/context/Auth';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {api} from '../../services/api';
import {ReactWithUserDto} from '../../apiClient';

export type ChatRequestScreenProps = {likeId: string};

const ChatToolbar: React.FC<InputToolbarProps<IMessage>> = props => {
  return (
    <InputToolbar
      {...props}
      primaryStyle={{flex: 1}}
      containerStyle={{
        flex: 1,
        flexDirection: 'row-reverse',
        paddingHorizontal: 8,
        marginHorizontal: 8,
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

export const ChatRequestScreen: React.FC<
  MessagesStackCompositeScreenProps<'ChatRequests'>
> = ({route, navigation}) => {
  const {likeId} = route.params;

  const [message, setMessage] = useState<string>();

  const {user} = useContext(AuthContext);

  const {mutate: dislikeUser} = useMutation<unknown, unknown, ReactWithUserDto>(
    'dislikeUser',
    data => {
      return openApi.instance.like.likeControllerReactWithUser({
        requestBody: data
      });
    },
    {
      onSuccess: data => {
        // console.log('User disliked');
        navigation.navigate('Messages');
      },
      onError: () => {}
    }
  );

  const dislike = (id: string | number) => {
    dislikeUser({
      likedUserId: id.toString(),
      status: 'disliked'
    });
  };

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

  const {mutate} = useMutation(
    ['last-message'],
    (props: {message?: string; imageUrl?: string}) =>
      openApi.instance.message.messageControllerSendMessage({
        likeId,
        requestBody: props
      }),
    {
      onSuccess: data => setMessage(undefined)
      // onError: error => console.log({error})
    }
  );

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (
      (data?.data &&
        messages &&
        JSON.stringify(data.data)?.replace(/\.jpeg[^}]*\}/g, '.jpeg}') !==
          JSON.stringify(messages)?.replace(/\.jpeg[^}]*\}/g, '.jpeg}')) ||
      (data?.data && !messages)
    ) {
      setMessages(data?.data as unknown as IMessage[]);
    }
  }, [data?.data]);

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
        // console.log('Permission granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const imageUpload = async (
    image: ImageOrVideo,
    id: string,
    sendReaction: boolean = false
  ) => {
    const formData = new FormData();
    const trimmedURI =
      Platform.OS === 'android'
        ? image.path
        : image.path.replace('file://', '');
    const fileName = trimmedURI.split('/').pop();
    const media = {
      name: fileName,
      height: image.height,
      width: image.width,
      type: image.mime,
      uri: trimmedURI
    };

    formData.append('image', media as unknown as Blob);

    try {
      const res = await api.axiosFetch({
        url: '/users/upload/selfie-image',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      });
      // console.log('Last picture taken uploaded!');
      const lastPictureTakenId = (res.data as any).lastPictureTaken;
      if (sendReaction) {
        try {
          const res2 = await api.axiosFetch({
            url: '/likes/react',
            method: 'POST',
            headers: {
              Accept: 'application/json'
            },
            data: {
              likedUserId: id,
              status: 'liked',
              likedPhotoUrl: lastPictureTakenId
            }
          });
          navigation.navigate('Messages');
        } catch (error) {
          // console.log({error});
        }
      } else {
        // console.log('haha');
      }
    } catch (error) {
      // console.log({error});
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
        imageUpload(image, messages[0].user._id.toString(), true);
      }
    });
  };

  return (
    <>
      <View
        style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
        <ScreenView />
      </View>
      <GiftedChat
        onInputTextChanged={setMessage}
        user={{
          _id: user?._id ?? '',
          name: `${user?.firstName} ${user?.lastName}`,
          avatar:
            user?.profilePicture ??
            'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
        }}
        messages={messages}
        textInputProps={{
          value: message,
          style: {
            flex: 1,
            selectionColor: '#fb5b5a',
            color: 'black',
            autoCorrect: false,
            marginRight: 8
          }
        }}
        listViewProps={{
          style: {
            showsVerticalScrollIndicator: false,
            paddingHorizontal: 8
          }
        }}
        onPressAvatar={messageUser => navigateToProfile(messageUser._id)}
        onSend={messages => {
          mutate({message: messages[0].text});
        }}
        renderAccessory={props => (
          <Accessories {...props} onCameraPress={openCamera} />
        )}
        renderSend={SendButton}
        renderInputToolbar={() => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: 24,
              margin: 12,
              backgroundColor: '#FFFFFF70',
              ...Platform.select({
                ios: {
                  zIndex: -10
                }
              })
            }}>
            <Icons.XCircleIcon
              size={70}
              strokeWidth={1}
              color={'red'}
              onPress={() => {
                dislike(messages[0].user._id);
              }}
            />
            <Icons.CheckCircleIcon
              size={70}
              strokeWidth={1}
              color={'green'}
              onPress={() => {
                openCamera();
              }}
            />
          </View>
        )}
      />
    </>
  );
};
