import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ResultScreen() {
  const { dare, punishment } = useLocalSearchParams<{ dare: string; punishment: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Text style={styles.ouch}>OUCH!</Text>
          <Text style={styles.subtitle}>Je hebt de kans verloren</Text>
        </View>

        <Card elevated style={styles.dareCard}>
          <Text style={styles.dareLabel}>DARE</Text>
          <Text style={styles.dareText}>{dare}</Text>
        </Card>

        {!!punishment && (
          <>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OF</Text>
              <View style={styles.dividerLine} />
            </View>

            <Card style={styles.punishmentCard}>
              <Text style={styles.punishmentLabel}>KLEINE OPDRACHT</Text>
              <Text style={styles.punishmentText}>{punishment}</Text>
            </Card>
          </>
        )}

        <View style={styles.footer}>
          <Button label="Volgende" onPress={() => router.replace('/game/input')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xxl,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  ouch: {
    color: colors.danger,
    fontSize: typography.sizes.display,
    fontFamily: typography.fonts.black,
    letterSpacing: -2,
    lineHeight: typography.sizes.display * 1.1,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    marginTop: spacing.xs,
  },
  dareCard: {
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  dareLabel: {
    color: colors.danger,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.extrabold,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  dareText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    lineHeight: 30,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.bold,
    letterSpacing: 2,
  },
  punishmentCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  punishmentLabel: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.extrabold,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  punishmentText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    lineHeight: 24,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.xl,
  },
});
