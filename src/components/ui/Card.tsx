import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, radius } from '@/constants';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
};

export function Card({ children, style, elevated }: Props) {
  return (
    <View style={[styles.card, elevated && styles.elevated, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  elevated: {
    backgroundColor: colors.backgroundElevated,
  },
});
