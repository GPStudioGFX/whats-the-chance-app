import { View, Text, StyleSheet, ScrollView, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { colors, typography, spacing, radius } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlayerChip } from '@/components/ui/PlayerChip';

export default function SetupScreen() {
  const [nameInput, setNameInput] = useState('');
  const { players, addPlayer, removePlayer } = useGameStore();

  function handleAdd() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    addPlayer(trimmed);
    setNameInput('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Text style={styles.back}>← Terug</Text>
          </Pressable>
          <Text style={styles.title}>Spelers</Text>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputWrap}>
            <Input
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Naam invoeren"
              returnKeyType="done"
              onSubmitEditing={handleAdd}
              maxLength={20}
              autoCapitalize="words"
            />
          </View>
          <Pressable style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addBtnText}>+</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.chipScroll}
          contentContainerStyle={styles.chips}
          keyboardShouldPersistTaps="handled"
        >
          {players.length === 0 ? (
            <Text style={styles.emptyHint}>Voeg minimaal 2 spelers toe om te beginnen.</Text>
          ) : (
            players.map((p) => (
              <PlayerChip key={p.id} name={p.name} onRemove={() => removePlayer(p.id)} />
            ))
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.count}>
            {players.length} speler{players.length !== 1 ? 's' : ''}
          </Text>
          <Button
            label="Doorgaan"
            onPress={() => router.push('/theme')}
            disabled={players.length < 2}
          />
        </View>
      </KeyboardAvoidingView>
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
    paddingBottom: spacing.lg,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  inputWrap: {
    flex: 1,
  },
  addBtn: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  addBtnText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.xl,
    fontFamily: typography.fonts.bold,
    lineHeight: 28,
  },
  chipScroll: {
    flex: 1,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  emptyHint: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  footer: {
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  count: {
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.medium,
    textAlign: 'center',
  },
});
