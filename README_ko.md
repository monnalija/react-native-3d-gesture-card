# react-native-3d-gesture-card

React Native용 제스처 컨트롤과 플립 애니메이션을 지원하는 아름다운 3D 카드 컴포넌트입니다.

## 기능

- 🎯 **3D 제스처 컨트롤**: 자연스러운 터치 제스처로 카드 회전
- 🔄 **플립 애니메이션**: 커스터마이징 가능한 버튼으로 부드러운 카드 뒤집기
- 🎨 **커스터마이징**: 외형, 그림자, 상호작용의 완전한 제어
- 📱 **크로스 플랫폼**: iOS와 Android에서 모두 동작
- 🔧 **TypeScript**: 포괄적인 타입 정의와 완전한 TypeScript 지원
- ⚡ **고성능**: react-native-reanimated로 구축되어 부드러운 60fps 애니메이션

## 설치

```sh
npm install react-native-3d-gesture-card
```

### 의존성

이 라이브러리는 다음 peer dependencies가 필요합니다:

```sh
npm install react-native-gesture-handler react-native-reanimated
```

다음 설치 가이드를 따라주세요:
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation)

## 사용법

### 기본 예제

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Card3D } from 'react-native-3d-gesture-card';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card3D
        width={250}
        height={350}
        backgroundColor="#ffffff"
        shadowLevel={5}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>앞면</Text>
          <Text>이것은 앞면 컨텐츠입니다</Text>
        </View>
      </Card3D>
    </View>
  );
}
```

### 플립 버튼이 있는 고급 예제

```tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card3D, Card3DRef } from 'react-native-3d-gesture-card';

export default function App() {
  const cardRef = useRef<Card3DRef>(null);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card3D
        ref={cardRef}
        width={250}
        height={350}
        showFlipButton={true}
        flipButtonPosition="top-right"
        gestureSensitivity={5}
        backContent={
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>뒷면</Text>
            <Text>이것은 뒷면 컨텐츠입니다</Text>
          </View>
        }
        onFlip={(isFlipped) => console.log('카드 뒤집힘:', isFlipped)}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>앞면</Text>
          <Text>드래그하여 회전하고, 버튼을 탭하여 뒤집어보세요</Text>
        </View>
      </Card3D>

      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: '#007AFF' }}
        onPress={() => cardRef.current?.flip()}
      >
        <Text style={{ color: 'white' }}>외부 플립 버튼</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## API 레퍼런스

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `width` | `number` | `200` | 카드의 너비 |
| `height` | `number` | `300` | 카드의 높이 |
| `children` | `React.ReactNode` | - | 카드 앞면의 컨텐츠 |
| `backContent` | `React.ReactNode` | - | 카드 뒷면의 컨텐츠 |
| `backgroundColor` | `string` | `'#fff'` | 카드의 배경색 |
| `borderRadius` | `number` | `16` | 카드의 모서리 둥글기 |
| `zIndex` | `number` | `1` | 카드의 z-index |
| `shadowLevel` | `number` | `1` | 그림자 강도 (0-10, iOS 전용) |
| `customShadowColor` | `string` | - | 커스텀 그림자 색상 (iOS 전용) |
| `showFlipButton` | `boolean` | `false` | 카드에 플립 버튼 표시 여부 |
| `flipButtonPosition` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | 플립 버튼의 위치 |
| `onFlip` | `(isFlipped: boolean) => void` | - | 카드가 뒤집힐 때의 콜백 |
| `customFlipButton` | `React.ReactNode` | - | 커스텀 플립 버튼 컴포넌트 |
| `gestureSensitivity` | `number` | `7` | 제스처 민감도 (낮을수록 민감함) |
| `style` | `ViewStyle` | - | 카드의 추가 스타일 |

### Ref 메서드

| 메서드 | 타입 | 설명 |
|--------|------|------|
| `flip` | `() => void` | 프로그래밍 방식으로 카드 뒤집기 |
| `isFlipped` | `() => boolean` | 카드가 현재 뒤집혀있는지 확인 |

### 타입

```tsx
import { Card3D, Card3DRef, Card3DProps } from 'react-native-3d-gesture-card';
```

## 3D 회전 동작

이 컴포넌트는 특별한 3D 회전 로직을 사용합니다:

1. **한 축만 90도 이상 회전**: 뒷면 표시
2. **두 축 모두 90도 미만**: 앞면 표시
3. **두 축 모두 90도 이상**: 뒤집어진 앞면 표시 (실제 3D 카드처럼)

이는 실제 카드를 회전시키는 것과 같은 자연스러운 경험을 제공합니다.

## 기여하기

- [개발 워크플로우](CONTRIBUTING.md#development-workflow)
- [풀 리퀘스트 보내기](CONTRIBUTING.md#sending-a-pull-request)
- [행동 강령](CODE_OF_CONDUCT.md)

## 라이선스

MIT

---

[create-react-native-library](https://github.com/callstack/react-native-builder-bob)로 제작됨

---

[English README](./README.md)
