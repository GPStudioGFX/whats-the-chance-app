import { View, Text, StyleSheet, Pressable, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '@/store/gameStore';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onToggle: () => void;
  disabled?: boolean;
  badge?: string;
}

function ToggleRow({ label, value, onToggle, disabled, badge }: ToggleRowProps) {
  return (
    <View style={[styles.row, disabled && styles.rowDisabled]}>
      <View style={styles.rowLeft}>
        <Text style={[styles.rowLabel, disabled && styles.rowLabelDisabled]}>{label}</Text>
        {badge && <Text style={styles.badge}>{badge}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        disabled={disabled}
        trackColor={{ false: colors.backgroundElevated, true: colors.accent }}
        thumbColor={disabled ? colors.textMuted : colors.textPrimary}
        ios_backgroundColor={colors.backgroundElevated}
      />
    </View>
  );
}

const TAG_LABELS: Record<string, string> = {
  alc: 'Alcohol',
  geld: 'Geld',
  buiten: 'Buiten',
  avond: 'Avond',
};

export default function GameSettingsScreen() {
  const { settings, updateSettings } = useGameStore();

  function toggleTag(tag: string) {
    const current = settings.availableTags;
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    updateSettings({ availableTags: next });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.back}>← Terug</Text>
          </Pressable>
          <Text style={styles.title}>Game{'\n'}instellingen</Text>
        </View>

        {/* Sectie: Ter beschikking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TER BESCHIKKING</Text>
          <View style={styles.sectionCard}>
            {Object.entries(TAG_LABELS).map(([tag, label]) => (
              <ToggleRow
                key={tag}
                label={label}
                value={settings.availableTags.includes(tag)}
                onToggle={() => toggleTag(tag)}
              />
            ))}
          </View>
          <Text style={styles.sectionHint}>
            Dares met deze tags worden alleen getoond als de optie aan staat.
          </Text>
        </View>

        {/* Sectie: Spelsituatie */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SPELSITUATIE</Text>
          <View style={styles.sectionCard}>
            <ToggleRow
              label="Normale vragen"
              value={true}
              onToggle={() => {}}
              disabled
            />
            <ToggleRow
              label="Groepsvragen"
              value={false}
              onToggle={() => {}}
              disabled
              badge="v2"
            />
            <ToggleRow
              label="Puntensysteem"
              value={false}
              onToggle={() => {}}
              disabled
              badge="v2"
            />
          </View>
        </View>

        {/* Sectie: Straf */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STRAF</Text>
          <View style={styles.sectionCard}>
            <ToggleRow
              label="Kleine opdracht"
              value={true}
              onToggle={() => {}}
              disabled
            />
            <ToggleRow
              label="Puntenverlies"
              value={false}
              onToggle={() => {}}
              disabled
              badge="v2"
            />
            <ToggleRow
              label="Slokken"
              value={false}
              onToggle={() => {}}
              disabled
              badge="v2"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button label="Doorgaan" onPress={() => router.push('/rules')} />
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
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
    lineHeight: 42,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.bold,
    letterSpacing: 1.5,
    marginBottom: spacing.sm,
  },
  sectionCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  sectionHint: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.regular,
    marginTop: spacing.sm,
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowDisabled: {
    opacity: 0.4,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowLabel: {
    color: colors.textPrimary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
  },
  rowLabelDisabled: {
    color: colors.textSecondary,
  },
  badge: {
    color: colors.accent,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.bold,
    backgroundColor: colors.backgroundElevated,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  footer: {
    marginTop: spacing.sm,
  },
});
