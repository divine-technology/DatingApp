import React, {useState} from 'react';
import {TouchableHighlight, Image, View, Text} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {styles} from './Gallery.styles';

interface GalleryProps {
  images: {uri: string}[];
}
export const Gallery: React.FC<GalleryProps> = ({images}) => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  return (
    <>
      {images.map((uri, index) => (
        <TouchableHighlight
          key={index}
          onPress={() => {
            setImageIndex(index);
            setIsVisible(!visible);
          }}>
          <Image source={uri} resizeMode="stretch" style={styles.image} />
        </TouchableHighlight>
      ))}
      <ImageView
        images={images}
        FooterComponent={({imageIndex}) => (
          <View style={styles.footerContainer}>
            <Text style={styles.text}>{`${imageIndex + 1} / ${
              images.length
            }`}</Text>
            <View style={styles.subTextWrapper}>
              <Text style={styles.text}>Swipe left or right</Text>
            </View>
          </View>
        )}
        presentationStyle="overFullScreen"
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};
