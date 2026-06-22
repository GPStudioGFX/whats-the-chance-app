import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '@/store/gameStore';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';

const THEMES = [
  { id: 'casual', name: 'Casual', subtitle: 'Licht & grappig — voor iedereen', count: 22, color: colors.gold },
  { id: 'crazy', name: 'Crazy', subtitle: 'Bizar & episch — voor de durfals', count: 22, color: colors.accentLight },
  { id: 'party', name: 'Party', subtitle: 'Feest & fun — voor de avond', count: 24, color: colors.success },
];

export default function ThemeScreen() {
  const { selectedThemeIds, setThemes } = useGameStore();

  function toggleTheme(id: string) {
    if (selectedThemeIds.includes(id)) {
      const next = selectedThemeIds.filter((t) => t !== id);
      if (next.length > 0) setThemes(next);
    } else {
      setThemes([...selectedThemeIds, id]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.back}>← Terug</Text>
          </Pressable>
          <Text style={styles.title}>Kies een thema</Text>
          <Text style={styles.subtitle}>Selecteer één of meer thema's.</Text>
        </View>

        <View style={styles.cards}>
          {THEMES.map((theme) => {
            const selected = selectedThemeIds.includes(theme.id);
            return (
              <Pressable
                key={theme.id}
                style={[styles.card, selected && { borderColor: theme.color }]}
                onPress={() => toggleTheme(theme.id)}
              >
                <View style={styles.cardLeft}>
                  <View style={[styles.dot, { backgroundColor: theme.color }]} />
                  <View>
                    <Text style={styles.themeName}>{theme.name}</Text>
                    <Text style={styles.themeSubtitle}>{theme.subtitle}</Text>
                    <Text style={styles.themeCount}>{theme.count} dares</Text>
                  </View>
                </View>
                <Switch
                  value={selected}
                  onValueChange={() => toggleTheme(theme.id)}
                  trackColor={{ false: colors.backgroundElevated, true: theme.color }}
                  thumbColor={colors.textPrimary}
                  ios_backgroundColor={colors.backgroundElevated}
                />
              </Pressable>
            );
          })}
        </View>

        {selectedThemeIds.length === 1 && (
          <Text style={styles.minHint}>Minimaal 1 thema verplicht.</Text>
        )}

        <View style={styles.footer}>
          <Button
            label="Doorgaan"
            onPress={() => router.push('/game-settings')}
            disabled={selectedThemeIds.length === 0}
          />
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
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },
  back: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.black,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
  },
  cards: {
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
  },
  themeName: {
    color: colors.textPrimary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.bold,
  },
  themeSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    marginTop: 2,
  },
  themeCount: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.medium,
    marginTop: 4,
  },
  minHint: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: spacing.lg,
  },
});
