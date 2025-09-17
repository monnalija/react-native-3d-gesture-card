import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card3D } from 'react-native-3d-gesture-card';
import type { Card3DRef } from 'react-native-3d-gesture-card';
import { useRef } from 'react';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';

export default function App() {
  const cardRef = useRef<Card3DRef>(null);

  const handleExternalFlip = () => {
    cardRef.current?.flip();
  };

  return (
    <GestureHandlerRootView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* External control button via ref */}
        <TouchableOpacity
          style={styles.externalButton}
          onPress={handleExternalFlip}
        >
          <Text style={styles.buttonText}>Flip Card with External Button</Text>
        </TouchableOpacity>

        {/* Card with custom flip button */}
        <Card3D
          ref={cardRef}
          width={200}
          height={280}
          showFlipButton={true}
          flipButtonPosition="top-right"
          gestureSensitivity={1} // More sensitive (lower than default 7)
          customFlipButton={
            <View style={styles.customButton}>
              <Text style={styles.customButtonText}>🔄</Text>
            </View>
          }
          backContent={
            <View style={styles.cardContent}>
              <Text style={styles.title}>Back Side!</Text>
              <Text style={styles.subtitle}>Card has been flipped</Text>
              <Text style={styles.description}>
                🎉 Flip with custom button!
              </Text>
            </View>
          }
          onFlip={(isFlipped) => console.log('Card flipped:', isFlipped)}
        >
          <View style={styles.cardContent}>
            <Text style={styles.title}>Front Card</Text>
            <Text style={styles.subtitle}>Click flip button!</Text>
            <Text style={styles.description}>
              Press the button in the top right
            </Text>
          </View>
        </Card3D>

        {/* Custom style card 1 - shadowLevel 8 + red shadow */}
        <Card3D
          width={200}
          height={280}
          backgroundColor="#ff6b6b"
          borderRadius={24}
          shadowLevel={8}
          customShadowColor="#ff6b6b"
          showFlipButton={true}
          flipButtonPosition="top-right"
          // backContent={
          //   <View style={styles.cardContent}>
          //     <Text style={styles.title}>Back Side!</Text>
          //     <Text style={styles.subtitle}>Card has been flipped</Text>
          //     <Text style={styles.description}>
          //       🎉 Flip animation is working
          //     </Text>
          //   </View>
          // }
        >
          <View style={styles.cardContent}>
            <Text style={[styles.title, styles.whiteText]}>Red Card</Text>
            <Text style={[styles.subtitle, styles.whiteText]}>
              Level 8 Shadow
            </Text>
          </View>
        </Card3D>

        {/* Custom style card 2 - shadowLevel 10 + teal shadow */}
        <Card3D
          width={200}
          height={280}
          backgroundColor="#4ecdc4"
          borderRadius={8}
          shadowLevel={10}
          customShadowColor="#4ecdc4"
          style={styles.tiltedCard}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.title, styles.whiteText]}>Teal Card</Text>
            <Text style={[styles.subtitle, styles.whiteText]}>
              Level 10 Shadow
            </Text>
          </View>
        </Card3D>

        {/* shadowLevel 0 card */}
        <Card3D
          width={200}
          height={280}
          backgroundColor="#ffd93d"
          borderRadius={16}
          shadowLevel={0}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.title, styles.darkText]}>No Shadow</Text>
            <Text style={[styles.subtitle, styles.grayText]}>Level 0</Text>
          </View>
        </Card3D>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    gap: 30,
    paddingTop: 100,
    paddingBottom: 100,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  whiteText: {
    color: 'white',
  },
  darkText: {
    color: '#333',
  },
  grayText: {
    color: '#666',
  },
  tiltedCard: {
    transform: [{ rotateZ: '5deg' }],
  },
  externalButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  customButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  customButtonText: {
    fontSize: 20,
  },
});
