import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '@/store/gameStore';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';

const PVP_RULES = [
  { n: 1, text: 'Wijs zelf aan wie de dare uitvoert — de app bepaalt niet wie aan de beurt is.' },
  { n: 2, text: 'Tap "Volgende" om een nieuwe dare te onthullen.' },
  { n: 3, text: 'Weiger je de dare? Doe dan de kleine opdracht als alternatief.' },
  { n: 4, text: 'De dare-pool reset automatisch als alle dares gezien zijn.' },
];

const PVGAME_RULES = [
  { n: 1, text: 'De app kiest willekeurig een speler en toont een dare.' },
  { n: 2, text: 'Stel je kans in (1 op X) en geef jouw getal op.' },
  { n: 3, text: 'De app onthult een willekeurig getal tussen 1 en X.' },
  { n: 4, text: 'Match? Dare uitvoeren. Geen match? Je bent veilig!' },
];

export default function RulesScreen() {
  const { mode } = useGameStore();

  const rules = mode === 'pvgame' ? PVGAME_RULES : PVP_RULES;
  const nextRoute = mode === 'pvgame' ? '/game/input' : '/game/dare';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.back}>← Terug</Text>
          </Pressable>
          <Text style={styles.title}>Spelregels</Text>
          <Text style={styles.modeTag}>{mode === 'pvgame' ? 'PvGame' : 'PvP'}</Text>
        </View>

        <View style={styles.rulesList}>
          {rules.map((rule) => (
            <View key={rule.n} style={styles.ruleRow}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{rule.n}</Text>
              </View>
              <Text style={styles.ruleText}>{rule.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Button label="Start het spel" onPress={() => router.push(nextRoute)} />
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
  modeTag: {
    color: colors.accent,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  rulesList: {
    gap: spacing.md,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  numberText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.black,
  },
  ruleText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    flex: 1,
    lineHeight: 22,
    paddingTop: 5,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: spacing.lg,
  },
});
