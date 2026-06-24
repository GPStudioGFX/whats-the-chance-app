import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors, typography, spacing } from '@/constants';
import { Button } from '@/components/ui/Button';

export default function SafeScreen() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const subtitleOpacity = useSharedValue(0);
  const subtitleStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value }));

  useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 120 });
    opacity.value = withTiming(1, { duration: 300 });
    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 400 }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topSection}>
          <Animated.View style={animatedStyle}>
            <Text style={styles.veilig}>VEILIG!</Text>
          </Animated.View>
          <Animated.Text style={[styles.subtitle, subtitleStyle]}>
            Geen match — je bent er van af
          </Animated.Text>
        </View>

        <View style={styles.dots}>
          {['✦', '✦', '✦'].map((dot, i) => (
            <Text key={i} style={[styles.dot, { opacity: 0.3 + i * 0.35 }]}>
              {dot}
            </Text>
          ))}
        </View>

        <View style={styles.footer}>
          <Button label="Volgende" onPress={() => router.replace('/game/input')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  veilig: {
    color: colors.success,
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.black,
    letterSpacing: -2,
    textAlign: 'center',
    lineHeight: typography.sizes.display * 1.1,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  dot: {
    color: colors.success,
    fontSize: typography.sizes.xl,
  },
  footer: {
    paddingBottom: spacing.sm,
  },
});
