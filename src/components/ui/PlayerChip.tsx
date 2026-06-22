import { Pressable, Text, StyleSheet, View } from 'react-native';
import { colors, typography, spacing, radius } from '@/constants';

type Props = {
  name: string;
  onRemove: () => void;
};

export function PlayerChip({ name, onRemove }: Props) {
  return (
    <View style={styles.chip}>
      <Text style={styles.name}>{name}</Text>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Text style={styles.remove}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    gap: spacing.xs,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  remove: {
    color: colors.textSecondary,
    fontSize: typography.sizes.lg,
    lineHeight: 20,
  },
});
