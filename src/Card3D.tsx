import { useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import type { Card3DRef, Card3DProps } from './types';

/**
 * Todo :
 * [android]
 * - elevation이 아닌 다른 방법으로 그림자를 구현하여 3d animation이 제대로 작동하도록 수정
 */

// shadowLevel에 따른 그림자 스타일 생성 함수
const getShadowStyle = (level: number, customColor?: string) => {
  if (level === 0) return {};

  const shadowStyles = [
    {}, // level 0
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      // elevation: 1,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      // elevation: 2,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      // elevation: 3,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      // elevation: 4,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      // elevation: 5,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      // elevation: 6,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      // elevation: 7,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5.46,
      // elevation: 8,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      // elevation: 9,
    },
    {
      shadowColor: customColor || '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      // elevation: 10,
    },
  ];

  return shadowStyles[Math.min(Math.max(level, 0), 10)];
};

export const Card3D = forwardRef<Card3DRef, Card3DProps>(
  (
    {
      width = 200,
      height = 300,
      children,
      backContent,
      backgroundColor = '#fff',
      borderRadius = 16,
      zIndex = 1,
      shadowLevel = 1,
      customShadowColor,
      showFlipButton = false,
      flipButtonPosition = 'top-right',
      onFlip,
      customFlipButton,
      gestureSensitivity = 7,
      style,
    },
    ref
  ) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const rotateX = useSharedValue(0);
    const rotateY = useSharedValue(0);
    const flipRotation = useSharedValue(0);

    // ref를 통해 외부에서 호출할 수 있는 함수들
    useImperativeHandle(ref, () => ({
      flip: () => handleFlip(),
      isFlipped: () => isFlipped,
    }));

    const panGesture = Gesture.Pan()
      .onChange((event) => {
        rotateX.value = withSpring(event.translationY / gestureSensitivity);
        rotateY.value = withSpring(-event.translationX / gestureSensitivity);
      })
      .onEnd(() => {
        rotateX.value = withSpring(0);
        rotateY.value = withSpring(0);
      });

    // 뒤집기 함수
    const handleFlip = () => {
      const newFlippedState = !isFlipped;
      setIsFlipped(newFlippedState);
      flipRotation.value = withSpring(newFlippedState ? 180 : 0);
      onFlip?.(newFlippedState);
    };

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { perspective: 600 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value + flipRotation.value}deg` },
      ],
    }));

    // 앞면/뒷면 컨텐츠 결정 (3D 회전 조합 고려)
    const frontOpacity = useAnimatedStyle(() => {
      const rotYTotal = Math.abs((rotateY.value + flipRotation.value) % 360);
      const rotXTotal = Math.abs(rotateX.value % 360);

      const normalizedRotY = rotYTotal > 180 ? 360 - rotYTotal : rotYTotal;
      const normalizedRotX = rotXTotal > 180 ? 360 - rotXTotal : rotXTotal;

      const isYOver90 = normalizedRotY >= 90;
      const isXOver90 = normalizedRotX >= 90;

      // 두 축 모두 90도 이상 OR 두 축 모두 90도 미만일 때 앞면 표시
      const showFront = (isYOver90 && isXOver90) || (!isYOver90 && !isXOver90);

      return {
        opacity: showFront ? 1 : 0,
        transform: [{ rotateY: '0deg' }],
      };
    });

    const backOpacity = useAnimatedStyle(() => {
      const rotYTotal = Math.abs((rotateY.value + flipRotation.value) % 360);
      const rotXTotal = Math.abs(rotateX.value % 360);

      const normalizedRotY = rotYTotal > 180 ? 360 - rotYTotal : rotYTotal;
      const normalizedRotX = rotXTotal > 180 ? 360 - rotXTotal : rotXTotal;

      const isYOver90 = normalizedRotY >= 90;
      const isXOver90 = normalizedRotX >= 90;

      // 한 축만 90도 이상일 때 뒷면 표시
      const showBack = (isYOver90 && !isXOver90) || (!isYOver90 && isXOver90);

      return {
        opacity: showBack ? 1 : 0,
        transform: [{ rotateY: '180deg' }],
        position: 'absolute' as const,
      };
    });

    // 뒤집기 버튼 위치 스타일
    const getFlipButtonStyle = () => {
      const baseStyle = {
        position: 'absolute' as const,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        zIndex: 10,
      };

      switch (flipButtonPosition) {
        case 'top-left':
          return { ...baseStyle, top: 10, left: 10 };
        case 'top-right':
          return { ...baseStyle, top: 10, right: 10 };
        case 'bottom-left':
          return { ...baseStyle, bottom: 10, left: 10 };
        case 'bottom-right':
          return { ...baseStyle, bottom: 10, right: 10 };
        default:
          return { ...baseStyle, top: 10, right: 10 };
      }
    };

    // 버튼에 적용할 counter-rotation (flip rotation만 상쇄)
    const buttonAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        { rotateY: `${-flipRotation.value}deg` }, // flip rotation 상쇄
      ],
    }));

    const shadowStyle = getShadowStyle(shadowLevel, customShadowColor);

    const cardStyle = {
      width,
      height,
      backgroundColor,
      borderRadius,
      zIndex,
      ...shadowStyle,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    };

    // GestureHandlerRootView를 내부적으로 제공하여 사용자 설정 불필요
    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[cardStyle, style, animatedStyle]}>
          {/* 앞면 컨텐츠 */}
          <Animated.View style={frontOpacity}>{children}</Animated.View>

          {/* 뒷면 컨텐츠 (backContent가 있을 때만) */}
          {backContent && (
            <Animated.View style={backOpacity}>{backContent}</Animated.View>
          )}

          {/* 뒤집기 버튼 - 제스처는 따라가지만 flip rotation만 상쇄 */}
          {showFlipButton && (
            <Animated.View style={[getFlipButtonStyle(), buttonAnimatedStyle]}>
              {customFlipButton ? (
                <TouchableOpacity
                  style={styles.customButtonContainer}
                  onPress={handleFlip}
                  activeOpacity={0.8}
                >
                  {customFlipButton}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.defaultButtonContainer}
                  onPress={handleFlip}
                  activeOpacity={0.8}
                >
                  <Image
                    source={require('./icons/rotating-arrow-to-the-right.png')}
                    style={styles.flipButtonIcon}
                  />
                </TouchableOpacity>
              )}
            </Animated.View>
          )}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  defaultButtonContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flipButtonIcon: {
    width: 14,
    height: 14,
    tintColor: 'white',
  },
});
