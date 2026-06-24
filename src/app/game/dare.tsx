import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '@/store/gameStore';
import { LocalDareRepository } from '@/data/repository/LocalDareRepository';
import { Dare } from '@/data/repository/DareRepository';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const repo = new LocalDareRepository();

export default function DareScreen() {
  const { selectedThemeIds, usedDareIds, settings, markDareUsed, setCurrentDare, resetGame } =
    useGameStore();
  const [dare, setDare] = useState<Dare | null>(null);

  function loadNextDare() {
    const next = repo.getRandomDare(selectedThemeIds, usedDareIds, settings.availableTags);
    if (!next) return;
    setCurrentDare(next);
    markDareUsed(next.id);
    setDare(next);
  }

  useEffect(() => {
    loadNextDare();
  }, []);

  function handleStop() {
    resetGame();
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Pressable onPress={handleStop} hitSlop={12}>
            <Text style={styles.stop}>← Stop</Text>
          </Pressable>
          <Text style={styles.counter}>{usedDareIds.length} gezien</Text>
        </View>

        <View style={styles.dareContainer}>
          <Card elevated style={styles.dareCard}>
            <Text style={styles.dareText}>{dare?.text ?? ''}</Text>
          </Card>
        </View>

        <View style={styles.footer}>
          <Button label="Volgende" onPress={loadNextDare} />
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  stop: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
  },
  counter: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
  },
  dareContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dareCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  dareText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    textAlign: 'center',
    lineHeight: 36,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
});
