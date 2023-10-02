import React from 'react';
import {Image, ImageProps, StyleProp, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type ImageWithLoaderProps = ImageProps & {};

const ImagePlaceholder = ({style}: {style?: ViewStyle}) => {
  return (
    <View
      style={{
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}>
      <View style={{width: '100%', height: '100%'}}>
        <SkeletonPlaceholder backgroundColor="#d3d3d3" borderRadius={6}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item width={'100%'} height={'100%'} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = props => {
  const {style} = props;
  return (
    <View style={style}>
      <ImagePlaceholder style={style as ViewStyle} />
      <Image {...props} style={style} />
    </View>
  );
};
