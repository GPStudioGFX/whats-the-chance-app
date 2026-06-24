import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGameStore } from '@/store/gameStore';
import { LocalDareRepository } from '@/data/repository/LocalDareRepository';
import { Dare } from '@/data/repository/DareRepository';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const repo = new LocalDareRepository();

export default function InputScreen() {
  const { players, selectedThemeIds, usedDareIds, settings, markDareUsed, setCurrentDare, resetGame } =
    useGameStore();

  const [player] = useState(() => players[Math.floor(Math.random() * players.length)]);
  const [dare, setDare] = useState<Dare | null>(null);
  const [xValue, setXValue] = useState('');
  const [spelerGetal, setSpelerGetal] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const next = repo.getRandomDare(selectedThemeIds, usedDareIds, settings.availableTags);
    if (next) {
      setCurrentDare(next);
      markDareUsed(next.id);
      setDare(next);
    }
  }, []);

  function handleBevestig() {
    const x = parseInt(xValue, 10);
    const getal = parseInt(spelerGetal, 10);

    if (!xValue || !spelerGetal) {
      setError('Vul beide velden in');
      return;
    }
    if (isNaN(x) || x < 2) {
      setError('Kans moet minimaal 1 op 2 zijn');
      return;
    }
    if (isNaN(getal) || getal < 1 || getal > x) {
      setError(`Kies een getal tussen 1 en ${x}`);
      return;
    }

    setError('');
    router.push({ pathname: '/game/reveal', params: { x: x.toString(), spelerGetal: getal.toString() } });
  }

  function handleStop() {
    resetGame();
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Pressable onPress={handleStop} hitSlop={12}>
              <Text style={styles.stop}>← Stop</Text>
            </Pressable>
          </View>

          <View style={styles.playerSection}>
            <Text style={styles.playerName}>{player?.name}</Text>
            <Text style={styles.playerLabel}>is aan de beurt</Text>
          </View>

          <Card elevated style={styles.dareCard}>
            <Text style={styles.dareText}>{dare?.text ?? ''}</Text>
          </Card>

          <Text style={styles.sectionLabel}>Hoe groot is de kans?</Text>

          <View style={styles.inputsRow}>
            <View style={styles.inputBlock}>
              <Text style={styles.inputPrefix}>1 op</Text>
              <TextInput
                style={styles.numberInput}
                value={xValue}
                onChangeText={(t) => {
                  setXValue(t);
                  setError('');
                }}
                keyboardType="number-pad"
                placeholder="X"
                placeholderTextColor={colors.textMuted}
                maxLength={3}
                textAlign="center"
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.inputPrefix}>Jouw getal</Text>
              <TextInput
                style={styles.numberInput}
                value={spelerGetal}
                onChangeText={(t) => {
                  setSpelerGetal(t);
                  setError('');
                }}
                keyboardType="number-pad"
                placeholder="?"
                placeholderTextColor={colors.textMuted}
                maxLength={3}
                textAlign="center"
              />
            </View>
          </View>

          {!!error && <Text style={styles.error}>{error}</Text>}

          <View style={styles.footer}>
            <Button label="Bevestig" onPress={handleBevestig} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  stop: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
  },
  playerSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  playerName: {
    color: colors.gold,
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.black,
    letterSpacing: -0.5,
  },
  playerLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.medium,
    marginTop: spacing.xs,
  },
  dareCard: {
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dareText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.bold,
    textAlign: 'center',
    lineHeight: 30,
  },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semibold,
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  inputsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  inputBlock: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.sm,
  },
  inputPrefix: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
  },
  numberInput: {
    width: '100%',
    height: 72,
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    color: colors.textPrimary,
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.black,
  },
  error: {
    color: colors.danger,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.xl,
  },
});
