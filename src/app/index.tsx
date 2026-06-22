import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '@/store/gameStore';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';

const THEME_PREVIEWS = [
  { id: 'casual', name: 'Casual', subtitle: 'Licht & grappig', count: 22, color: colors.gold },
  { id: 'crazy', name: 'Crazy', subtitle: 'Bizar & episch', count: 22, color: colors.accentLight },
  { id: 'party', name: 'Party', subtitle: 'Feest & fun', count: 24, color: colors.success },
];

export default function HomeScreen() {
  const { setMode, resetGame } = useGameStore();

  function startPvP() {
    resetGame();
    setMode('pvp');
    router.push('/theme');
  }

  function startPvGame() {
    resetGame();
    setMode('pvgame');
    router.push('/setup');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.settingsBtn} onPress={() => router.push('/settings')}>
          <Text style={styles.settingsText}>···</Text>
        </Pressable>
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.titleTop}>WHAT'S THE</Text>
        <Text style={styles.titleBottom}>CHANCE?</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        snapToInterval={160}
        decelerationRate="fast"
      >
        {THEME_PREVIEWS.map((theme) => (
          <View key={theme.id} style={[styles.themeCard, { borderLeftColor: theme.color }]}>
            <View style={[styles.dot, { backgroundColor: theme.color }]} />
            <Text style={styles.themeName}>{theme.name}</Text>
            <Text style={styles.themeSubtitle}>{theme.subtitle}</Text>
            <Text style={styles.themeCount}>{theme.count} dares</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttons}>
        <Button label="Speel PvP" onPress={startPvP} />
        <Button label="Speel PvGame" onPress={startPvGame} variant="ghost" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.bold,
    letterSpacing: 2,
  },
  titleBlock: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  titleTop: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.extrabold,
    letterSpacing: 3,
  },
  titleBottom: {
    color: colors.textPrimary,
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.black,
    letterSpacing: -1,
    lineHeight: 70,
  },
  carousel: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  themeCard: {
    width: 148,
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.xl,
    padding: spacing.md,
    borderLeftWidth: 3,
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    marginBottom: spacing.xs,
  },
  themeName: {
    color: colors.textPrimary,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.extrabold,
    letterSpacing: 0.5,
  },
  themeSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
  },
  themeCount: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    marginTop: spacing.sm,
  },
  buttons: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    marginTop: 'auto',
  },
});
