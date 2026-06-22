import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import { colors, typography, spacing, radius } from '@/constants';

type Props = TextInputProps & {
  label?: string;
};

export function Input({ label, style, ...props }: Props) {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.accent}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 56,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.borderAccent,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    backgroundColor: colors.backgroundCard,
  },
});
