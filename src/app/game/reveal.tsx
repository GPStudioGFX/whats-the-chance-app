import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useGameStore } from '@/store/gameStore';
import { colors, typography, spacing } from '@/constants';

export default function RevealScreen() {
  const { x: xParam, spelerGetal: spelerGetalParam } = useLocalSearchParams<{
    x: string;
    spelerGetal: string;
  }>();

  const x = Number(xParam);
  const spelerGetal = Number(spelerGetalParam);
  const currentDare = useGameStore((s) => s.currentDare);

  const appGetal = useState(() => Math.floor(Math.random() * x) + 1)[0];
  const isMatch = appGetal === spelerGetal;

  const [displayNum, setDisplayNum] = useState<number>(Math.floor(Math.random() * x) + 1);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.back(1.2)) });

    const sequence: number[] = [];
    for (let i = 0; i < 18; i++) {
      sequence.push(Math.floor(Math.random() * x) + 1);
    }
    sequence.push(appGetal);

    let idx = 0;
    function tick() {
      setDisplayNum(sequence[idx]);
      idx++;
      if (idx < sequence.length) {
        const delay = 60 + (idx / sequence.length) * 320;
        setTimeout(tick, delay);
      } else {
        scale.value = withSequence(
          withTiming(1.25, { duration: 200, easing: Easing.out(Easing.quad) }),
          withTiming(1, { duration: 350, easing: Easing.out(Easing.quad) })
        );
        setTimeout(() => {
          router.replace({
            pathname: isMatch ? '/game/result' : '/game/safe',
            params: {
              dare: currentDare?.text ?? '',
              punishment: currentDare?.punishment ?? '',
            },
          });
        }, 1200);
      }
    }

    const startDelay = setTimeout(tick, 300);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.label}>De kans bepaalt...</Text>

        <View style={styles.numberWrapper}>
          <Animated.View style={[styles.numberContainer, animatedStyle]}>
            <Text style={styles.number}>{displayNum}</Text>
          </Animated.View>
          <Text style={styles.outOf}>op {x}</Text>
        </View>

        <Text style={styles.hint}>Jij koos {spelerGetal}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  numberWrapper: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  numberContainer: {
    width: 180,
    height: 180,
    backgroundColor: colors.backgroundElevated,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.textPrimary,
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.black,
    lineHeight: typography.sizes.display * 1.1,
  },
  outOf: {
    color: colors.textSecondary,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semibold,
  },
  hint: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
  },
});
