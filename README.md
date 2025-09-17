# react-native-3d-gesture-card

A beautiful 3D card component with gesture controls and flip animations for React Native.

[한국어](./README_ko.md) | [English](./README.md)

## Features

- 🎯 **3D Gesture Controls**: Rotate cards with natural touch gestures
- 🔄 **Flip Animation**: Smooth card flip with customizable buttons
- 🎨 **Customizable**: Full control over appearance, shadows, and interactions
- 📱 **Cross-platform**: Works on iOS and Android
- 🔧 **TypeScript**: Full TypeScript support with comprehensive type definitions
- ⚡ **Performant**: Built with react-native-reanimated for smooth 60fps animations

## Installation

```sh
npm install react-native-3d-gesture-card
```

### Dependencies

This library requires the following peer dependencies:

```sh
npm install react-native-gesture-handler react-native-reanimated
```

Follow the installation instructions for:
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)

## Demo Video

<video width="100%" controls>
  <source src="https://github.com/user-attachments/assets/sample.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Usage

### Basic Example

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
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Front Side</Text>
          <Text>This is the front content</Text>
        </View>
      </Card3D>
    </View>
  );
}
```

### Advanced Example with Flip Button

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
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Back Side</Text>
            <Text>This is the back content</Text>
          </View>
        }
        onFlip={(isFlipped) => console.log('Card flipped:', isFlipped)}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Front Side</Text>
          <Text>Drag to rotate, tap button to flip</Text>
        </View>
      </Card3D>

      <TouchableOpacity
        style={{ marginTop: 20, padding: 10, backgroundColor: '#007AFF' }}
        onPress={() => cardRef.current?.flip()}
      >
        <Text style={{ color: 'white' }}>External Flip Button</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### In ScrollView Example

When using the Card3D component inside a scrollable view, you **must** use the `ScrollView` from `react-native-gesture-handler` instead of the default React Native `ScrollView` to ensure proper gesture handling.

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; // Important: Use this instead of React Native's ScrollView
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
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Card 1</Text>
          <Text>This card works properly in ScrollView</Text>
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
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Card 2</Text>
          <Text>Multiple cards in ScrollView</Text>
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
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Card 3</Text>
          <Text>Scroll and gesture both work smoothly</Text>
        </View>
      </Card3D>
    </ScrollView>
  );
}
```

**Important Note**: Always use `ScrollView` from `react-native-gesture-handler` when the Card3D component is inside a scrollable container. Using the default React Native `ScrollView` may cause gesture conflicts.

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `200` | Width of the card |
| `height` | `number` | `300` | Height of the card |
| `children` | `React.ReactNode` | - | Content for the front side of the card |
| `backContent` | `React.ReactNode` | - | Content for the back side of the card |
| `backgroundColor` | `string` | `'#fff'` | Background color of the card |
| `borderRadius` | `number` | `16` | Corner radius of the card |
| `zIndex` | `number` | `1` | Z-index of the card |
| `shadowLevel` | `number` | `1` | Shadow intensity (0-10, iOS only) |
| `customShadowColor` | `string` | - | Custom shadow color (iOS only) |
| `showFlipButton` | `boolean` | `false` | Show the flip button on the card |
| `flipButtonPosition` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Position of the flip button |
| `onFlip` | `(isFlipped: boolean) => void` | - | Callback when card is flipped |
| `customFlipButton` | `React.ReactNode` | - | Custom flip button component |
| `gestureSensitivity` | `number` | `7` | Gesture sensitivity (lower = more sensitive) |
| `style` | `ViewStyle` | - | Additional styles for the card |

### Ref Methods

| Method | Type | Description |
|--------|------|-------------|
| `flip` | `() => void` | Programmatically flip the card |
| `isFlipped` | `() => boolean` | Check if the card is currently flipped |

### Types

```tsx
import { Card3D, Card3DRef, Card3DProps } from 'react-native-3d-gesture-card';
```


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
