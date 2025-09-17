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
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)

## 예제 영상

<video width="100%" controls>
  <source src="https://github.com/monnalija/react-native-3d-gesture-card/blob/main/example/assets/sample.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

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

### ScrollView 내부 사용 예제

Card3D 컴포넌트를 스크롤 가능한 뷰 내부에서 사용할 때는 제스처 처리를 위해 기본 React Native의 `ScrollView` 대신 `react-native-gesture-handler`의 `ScrollView`를 **반드시** 사용해야 합니다.

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; // 중요: React Native의 ScrollView 대신 이것을 사용하세요
import { Card3D } from 'react-native-3d-gesture-card';

export default function App() {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        paddingVertical: 50,
        gap: 30
      }}
    >
      <Card3D
        width={250}
        height={350}
        backgroundColor="#ffffff"
        shadowLevel={3}
        showFlipButton={true}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>카드 1</Text>
          <Text>이 카드는 ScrollView에서 제대로 작동합니다</Text>
        </View>
      </Card3D>

      <Card3D
        width={250}
        height={350}
        backgroundColor="#f0f0f0"
        shadowLevel={5}
        showFlipButton={true}
        flipButtonPosition="top-left"
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>카드 2</Text>
          <Text>ScrollView에서 여러 카드 사용</Text>
        </View>
      </Card3D>

      <Card3D
        width={250}
        height={350}
        backgroundColor="#e8e8e8"
        shadowLevel={2}
        gestureSensitivity={5}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>카드 3</Text>
          <Text>스크롤과 제스처가 모두 부드럽게 작동합니다</Text>
        </View>
      </Card3D>
    </ScrollView>
  );
}
```

**중요한 주의사항**: Card3D 컴포넌트가 스크롤 가능한 컨테이너 내부에 있을 때는 항상 `react-native-gesture-handler`의 `ScrollView`를 사용하세요. 기본 React Native의 `ScrollView`를 사용하면 제스처 충돌이 발생할 수 있습니다.

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
