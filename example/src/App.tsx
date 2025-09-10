import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card3D } from 'react-native-3d-gesture-card';
import type { Card3DRef } from 'react-native-3d-gesture-card';
import { useRef } from 'react';

export default function App() {
  const cardRef = useRef<Card3DRef>(null);

  const handleExternalFlip = () => {
    cardRef.current?.flip();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ref를 통한 외부 제어 버튼 */}
      <TouchableOpacity
        style={styles.externalButton}
        onPress={handleExternalFlip}
      >
        <Text style={styles.buttonText}>외부 버튼으로 카드 뒤집기</Text>
      </TouchableOpacity>

      {/* 커스텀 플립 버튼이 있는 카드 */}
      <Card3D
        ref={cardRef}
        width={200}
        height={280}
        showFlipButton={true}
        flipButtonPosition="top-right"
        gestureSensitivity={1} // 더 민감하게 (기본값 7보다 낮음)
        customFlipButton={
          <View
            style={{
              backgroundColor: 'red',
              borderRadius: 15,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>🔄</Text>
          </View>
        }
        backContent={
          <View style={styles.cardContent}>
            <Text style={styles.title}>뒷면!</Text>
            <Text style={styles.subtitle}>카드가 뒤집혔어요</Text>
            <Text style={styles.description}>🎉 커스텀 버튼으로 뒤집기!</Text>
          </View>
        }
        onFlip={(isFlipped) => console.log('카드 뒤집힘:', isFlipped)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.title}>앞면 카드</Text>
          <Text style={styles.subtitle}>뒤집기 버튼 클릭!</Text>
          <Text style={styles.description}>오른쪽 위 버튼을 눌러보세요</Text>
        </View>
      </Card3D>

      {/* 커스텀 스타일 카드 1 - shadowLevel 8 + 빨간 그림자 */}
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
        //     <Text style={styles.title}>뒷면!</Text>
        //     <Text style={styles.subtitle}>카드가 뒤집혔어요</Text>
        //     <Text style={styles.description}>
        //       🎉 플립 애니메이션이 작동합니다
        //     </Text>
        //   </View>
        // }
      >
        <View style={styles.cardContent}>
          <Text style={[styles.title, styles.whiteText]}>빨간 카드</Text>
          <Text style={[styles.subtitle, styles.whiteText]}>
            Level 8 Shadow
          </Text>
        </View>
      </Card3D>

      {/* 커스텀 스타일 카드 2 - shadowLevel 10 + 청록 그림자 */}
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
          <Text style={[styles.title, styles.whiteText]}>청록 카드</Text>
          <Text style={[styles.subtitle, styles.whiteText]}>
            Level 10 Shadow
          </Text>
        </View>
      </Card3D>

      {/* shadowLevel 0 카드 */}
      <Card3D
        width={200}
        height={280}
        backgroundColor="#ffd93d"
        borderRadius={16}
        shadowLevel={0}
      >
        <View style={styles.cardContent}>
          <Text style={[styles.title, styles.darkText]}>그림자 없음</Text>
          <Text style={[styles.subtitle, styles.grayText]}>Level 0</Text>
        </View>
      </Card3D>
    </ScrollView>
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
