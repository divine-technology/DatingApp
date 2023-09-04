import React, {
  ReactElement,
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  EasingFunction,
  PanResponder,
  View
} from 'react-native';
import {styles} from './CardSwiper.styles';

const exponentialDecay = (x: number, k: number = 0.1) => {
  return Math.exp(-k * x);
};

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const HORIZONTAL_SWIPE_THRESHOLD = SCREEN_WIDTH / 4;
const VERTICAL_SWIPE_THRESHOLD = SCREEN_HEIGHT / 5;

const DIRECTION = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom'
};

export type SwipeDirection = keyof typeof DIRECTION;

const directionMap: {[key in SwipeDirection]: {x: number; y: number}} = {
  top: {x: 0, y: -SCREEN_HEIGHT * 1.5},
  left: {x: -SCREEN_WIDTH * 1.5, y: 0},
  right: {x: SCREEN_WIDTH * 1.5, y: 0},
  bottom: {x: 0, y: SCREEN_HEIGHT * 1.5}
};

export type ClickableSwipeCard = {
  handleSwipeClick?: (direction: SwipeDirection) => void;
};

const directionAllowed = (
  swipeableDirection: SwipeableDirection,
  direction: SwipeDirection
): boolean => {
  if (
    direction === 'left' &&
    (swipeableDirection === 'all' ||
      swipeableDirection === 'horizontal' ||
      swipeableDirection === 'left')
  ) {
    return true;
  } else if (
    direction === 'right' &&
    (swipeableDirection === 'all' ||
      swipeableDirection === 'horizontal' ||
      swipeableDirection === 'right')
  ) {
    return true;
  } else if (
    direction === 'top' &&
    (swipeableDirection === 'all' ||
      swipeableDirection === 'vertical' ||
      swipeableDirection === 'top')
  ) {
    return true;
  } else if (
    direction === 'bottom' &&
    (swipeableDirection === 'all' ||
      swipeableDirection === 'vertical' ||
      swipeableDirection === 'bottom')
  ) {
    return true;
  }
  return false;
};

const getSwipeDirection = (
  swipeableDirection: SwipeableDirection,
  dx: number,
  dy: number
): SwipeDirection | undefined => {
  let direction: SwipeDirection | undefined;

  const horizontal = Math.abs(dx) > HORIZONTAL_SWIPE_THRESHOLD;
  const vertical = Math.abs(dy) > VERTICAL_SWIPE_THRESHOLD;

  if ((horizontal && !vertical) || (!horizontal && vertical)) {
    if (horizontal) {
      direction = dx > 0 ? 'right' : 'left';
    } else {
      direction = dy > 0 ? 'bottom' : 'top';
    }
  }

  return direction && directionAllowed(swipeableDirection, direction)
    ? direction
    : undefined;
};

export type SwipableViewProps<T extends ClickableSwipeCard> = {
  onSwipe: (direction: SwipeDirection) => void;
  index: number;
  children: ReactElement<T>;
  swipeableDirection: SwipeableDirection;
  startOffset?: {x: number; y: number};
};

const SwipableViewCore: React.FC<
SwipableViewPropsWithForwardRef<unknown & ClickableSwipeCard>
> = ({
  children,
  index,
  swipeableDirection,
  startOffset = {x: 0, y: 0},
  onSwipe,
  forwardedRef
}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const [currentIndex, setCurrentIndex] = useState<number>();
  const animatedHeight = useRef(new Animated.Value(index)).current;

  let lastOffset: {x: number; y: number} = {x: 0, y: 0};

  useImperativeHandle(forwardedRef, () => ({
    manualSwipe: manualSwipe
  }));

  useEffect(() => {
    // lastOffset = startOffset;
    animateBack(Easing.linear);
  }, []);

  useEffect(() => {
    animate(Easing.linear);
  });

  const animate = (easing: EasingFunction) => {
    animatedHeight.setValue(exponentialDecay(currentIndex ?? index));
    Animated.timing(animatedHeight, {
      toValue: exponentialDecay(index),
      duration: 100,
      easing,
      useNativeDriver: false
    }).start(() => setCurrentIndex(index));
  };

  const animateBack = (easing: EasingFunction) => {
    pan.setValue(startOffset);
    Animated.timing(pan, {
      toValue: lastOffset,
      duration: 300,
      easing,
      useNativeDriver: false
    }).start();
  };

  const manualSwipe = (direction: SwipeDirection) => {
    Animated.timing(pan, {
      toValue: directionMap[direction],
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      onSwipe(direction);
    });
  };

  const tilt = pan.x.interpolate({
    inputRange: [-150, 0, 150],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        pan.setValue({
          x: lastOffset.x + gestureState.dx,
          y: lastOffset.y + gestureState.dy
        });
      },
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();

        const direction = getSwipeDirection(
          swipeableDirection,
          gestureState.dx,
          gestureState.dy
        );

        if (direction) {
          Animated.timing(pan, {
            toValue: directionMap[direction],
            duration: 300,
            useNativeDriver: false
          }).start(() => {
            onSwipe(direction);
            // Remove the card from your data array here
            // Update your component's state to reflect the change
          });
        } else {
          // Not swiped beyond the threshold, return to the original position
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false
          }).start();
        }

        lastOffset = {x: 0, y: 0};
      }
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {zIndex: 10 - index},
        {
          transform: [
            {translateX: pan.x},
            {translateY: pan.y},
            {rotate: tilt},
            {scale: animatedHeight}
          ]
        }
      ]}
      {...panResponder.panHandlers}>
      {children &&
        children !== null &&
        typeof children === 'object' &&
        React.cloneElement(children, {handleSwipeClick: manualSwipe})}
    </Animated.View>
  );
};

export type SwipableViewRef = {
  manualSwipe: (direction: SwipeDirection) => void;
};

type SwipableViewPropsWithForwardRef<T extends ClickableSwipeCard> =
  SwipableViewProps<T> & {
    forwardedRef: Ref<SwipableViewRef>;
  };

type SwipableViewPropsWithStandardRef<T extends ClickableSwipeCard> = SwipableViewProps<T> & {
  ref?: Ref<SwipableViewRef>;
};

export const SwipableView: <T extends ClickableSwipeCard>(
  props: SwipableViewPropsWithStandardRef<T>
) => ReactNode | null = forwardRef<SwipableViewRef, SwipableViewProps<any>>(
  ({...rest}, ref) => <SwipableViewCore forwardedRef={ref} {...rest} />
);

export type ObjectWithId = {
  _id: string | number;
};

const SWIPEABLE_DIRECTION = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
  horizontal: 'horizontal',
  vertical: 'vertical',
  all: 'all'
};

export type SwipeableDirection = keyof typeof SWIPEABLE_DIRECTION;

export type CardSwiperProps<T extends ObjectWithId> = {
  data: Array<T>;
  card: (props: T & Partial<ClickableSwipeCard>) => React.ReactElement;
  onSwipe: (direction: SwipeDirection, id: string | number) => void;
  onSwipeLeft?: (id: string | number) => void;
  onSwipeRight?: (id: string | number) => void;
  onSwipeTop?: (id: string | number) => void;
  onSwipeBottom?: (id: string | number) => void;
  onSwipeLast?: (id: string | number) => void;
  onSwipedAll?: () => void;
  removedCardsLimit?: number;
  swipeableDirection?: SwipeableDirection;
  infinite?: boolean;
  stackDepth?: number;
};

export type CardSwiperRef = {
  onBack: () => void;
  getCurrentCardId: () => string | number;
  manualSwipe: (direction: SwipeDirection) => void;
};

type CardSwiperPropsWithForwardRef<T extends ObjectWithId> =
  CardSwiperProps<T> & {
    forwardedRef: Ref<CardSwiperRef>;
  };

type PropsWithStandardRef<T extends ObjectWithId> = CardSwiperProps<T> & {
  ref?: Ref<CardSwiperRef>;
};

const CardSwiperCore = <T extends ObjectWithId>({
  data,
  swipeableDirection,
  infinite = false,
  stackDepth = 3,
  removedCardsLimit = 3,
  card,
  onSwipe,
  onSwipedAll,
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
  onSwipeBottom,
  forwardedRef
}: CardSwiperPropsWithForwardRef<T>) => {
  const [cards, setCards] = useState<{
    cardsToShow: Array<T>;
    removedCards: Array<T>;
    removedCardOffset: {x: number; y: number};
    lastSwipedDirections: SwipeDirection[];
  }>({
    cardsToShow: data,
    removedCards: [],
    removedCardOffset: {x: 0, y: 0},
    lastSwipedDirections: []
  });

  const firstCardRef = useRef<SwipableViewRef>(null);

  useEffect(() => {
    setCards(oldVal => {
      return {...oldVal, cardsToShow: data};
    });
  }, [data]);

  useImperativeHandle(forwardedRef, () => ({
    onBack: () => {
      setCards(oldVal => {
        const cardToBack = oldVal.removedCards.shift();
        oldVal.removedCards = [...oldVal.removedCards];
        cardToBack && oldVal.cardsToShow.unshift(cardToBack);
        oldVal.removedCardOffset = directionMap[oldVal.lastSwipedDirections[0]];
        oldVal.lastSwipedDirections.shift();
        oldVal.lastSwipedDirections = [...oldVal.lastSwipedDirections];
        return {...oldVal};
      });
    },
    getCurrentCardId: () => {
      return cards.cardsToShow[0]._id;
    },
    manualSwipe: firstCardRef.current ? firstCardRef.current.manualSwipe : () => {}
  }));

  const onCardSwipe = (direction: SwipeDirection, id: string | number) => {
    onSwipe(direction, id);
    switch (direction) {
      case 'bottom':
        onSwipeBottom && onSwipeBottom(id);
        break;
      case 'top':
        onSwipeTop && onSwipeTop(id);
        break;
      case 'left':
        onSwipeLeft && onSwipeLeft(id);
        break;
      case 'right':
        onSwipeRight && onSwipeRight(id);
        break;
    }
    setCards(oldVal => {
      const removedElement = oldVal.cardsToShow.shift();

      if (removedElement && !infinite) {
        oldVal.removedCards = [removedElement, ...oldVal.removedCards].slice(
          0,
          removedCardsLimit
        );
        oldVal.cardsToShow = [...oldVal.cardsToShow];
        oldVal.lastSwipedDirections = [
          direction,
          ...oldVal.lastSwipedDirections
        ].slice(0, removedCardsLimit);
        return {...oldVal};
      } else if (removedElement && infinite) {
        oldVal.removedCards.unshift(removedElement);
        const cardToReturnToStack =
          oldVal.removedCards.splice(removedCardsLimit);
        oldVal.cardsToShow = [...oldVal.cardsToShow, ...cardToReturnToStack];
        oldVal.lastSwipedDirections = [
          direction,
          ...oldVal.lastSwipedDirections
        ].slice(0, removedCardsLimit);
        return {...oldVal};
      } else if (!removedElement) {
        onSwipedAll && onSwipedAll();
      }

      return {...oldVal};
    });
  };

  return (
    <View style={styles.wrapper}>
      {cards.cardsToShow.slice(0, stackDepth)?.map((props, index) => (
        <SwipableView
          ref={index === 0 ? firstCardRef : undefined}
          key={props._id}
          index={index}
          onSwipe={direction => onCardSwipe(direction, props._id)}
          startOffset={index === 0 ? cards.removedCardOffset : undefined}
          swipeableDirection={swipeableDirection ?? 'all'}>
          {card(props)}
        </SwipableView>
      ))}
    </View>
  );
};

export const CardSwiper: <T extends ObjectWithId>(
  props: PropsWithStandardRef<T>
) => ReactNode | null = forwardRef<CardSwiperRef, CardSwiperProps<any>>(
  ({...rest}, ref) => <CardSwiperCore forwardedRef={ref} {...rest} />
);
