import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from '../../components/Button/Button';
import {MessagesStackScreenProps} from '../../navigation/MessagesRoutes';
import {ScreenView} from '../../components/ScreenWrapper/ScreenView';

export const MessagesScreen: React.FC<MessagesStackScreenProps<'Messages'>> = ({
  navigation
}) => {
  return (
    <ScreenView>
      <View style={{padding: 24}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 18
          }}>
          <Text
            style={{fontSize: 20, color: 'black', flex: 1, fontWeight: '700'}}>
            Messages
          </Text>
          <View style={{}}>
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
        <View style={{gap: 8}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 70, width: 70, borderRadius: 75}}
              source={{
                uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                padding: 12,
                justifyContent: 'center',
                flex: 1
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
                Joe Biden
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontWeight: '400',
                    flex: 1
                  }}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  Hello I am the president of the US Hello I am the president of
                  the Hello I am the president of the US US
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontWeight: '400',
                    marginLeft: 6
                  }}>
                  18:00
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 70, width: 70, borderRadius: 75}}
              source={{
                uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                padding: 12,
                justifyContent: 'center',
                flex: 1
              }}>
              <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
                Joe Biden
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    fontWeight: '400',
                    flex: 1
                  }}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  Hello I am the president of the US Hello I am the president of
                  the Hello I am the president of the US US
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontWeight: '400',
                    marginLeft: 6
                  }}>
                  18:00
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScreenView>
  );
};
