import type { ViewStyle } from 'react-native';

/**
 * Card3D 컴포넌트의 ref를 통해 노출되는 메서드들의 인터페이스
 * Interface for methods exposed through the Card3D component ref
 */
export interface Card3DRef {
  /**
   * 카드를 뒤집는 함수
   * Function to flip the card
   */
  flip: () => void;
  /**
   * 현재 카드가 뒤집어진 상태인지 확인하는 함수
   * Function to check if the card is currently flipped
   * @returns {boolean} 뒤집어진 상태면 true, 아니면 false | true if flipped, false otherwise
   */
  isFlipped: () => boolean;
}

/**
 * Card3D 컴포넌트의 Props 인터페이스
 * Props interface for the Card3D component
 */
export interface Card3DProps {
  /**
   * 카드의 너비 (기본값: 200)
   * Width of the card (default: 200)
   */
  width?: number;

  /**
   * 카드의 높이 (기본값: 300)
   * Height of the card (default: 300)
   */
  height?: number;

  /**
   * 카드 앞면에 표시될 컨텐츠
   * Content to be displayed on the front side of the card
   */
  children?: React.ReactNode;

  /**
   * 카드 뒷면에 표시될 컨텐츠
   * Content to be displayed on the back side of the card
   */
  backContent?: React.ReactNode;

  /**
   * 카드의 배경색 (기본값: '#fff')
   * Background color of the card (default: '#fff')
   */
  backgroundColor?: string;

  /**
   * 카드의 모서리 둥글기 (기본값: 16)
   * Border radius of the card corners (default: 16)
   */
  borderRadius?: number;

  /**
   * 카드의 z-index (기본값: 1)
   * Z-index of the card (default: 1)
   */
  zIndex?: number;

  /**
   * 그림자 레벨 (0-10 단계, 기본값: 1, iOS 전용)
   * Shadow level (0-10 scale, default: 1, iOS only)
   */
  shadowLevel?: number;

  /**
   * iOS용 커스텀 그림자 색상
   * Custom shadow color for iOS
   */
  customShadowColor?: string;

  /**
   * 뒤집기 버튼 표시 여부 (기본값: false)
   * Whether to show the flip button (default: false)
   */
  showFlipButton?: boolean;

  /**
   * 뒤집기 버튼 위치 (기본값: 'top-right')
   * Position of the flip button (default: 'top-right')
   */
  flipButtonPosition?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';

  /**
   * 카드가 뒤집힐 때 호출되는 콜백 함수
   * Callback function called when the card is flipped
   * @param {boolean} isFlipped - 뒤집어진 상태 여부 | Whether the card is flipped
   */
  onFlip?: (isFlipped: boolean) => void;

  /**
   * 커스텀 뒤집기 버튼 컴포넌트
   * Custom flip button component
   * 제공되면 기본 버튼 대신 이 컴포넌트가 사용됩니다.
   * If provided, this component will be used instead of the default button.
   */
  customFlipButton?: React.ReactNode;

  /**
   * 제스처 민감도 (기본값: 7, 낮을수록 민감함)
   * Gesture sensitivity (default: 7, lower values are more sensitive)
   * 값이 낮을수록 작은 움직임에도 크게 반응합니다.
   * Lower values make the card respond more to smaller movements.
   */
  gestureSensitivity?: number;

  /**
   * 추가적인 스타일
   * Additional styles for the card
   */
  style?: ViewStyle;
}
