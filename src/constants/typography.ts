export const typography = {
  fonts: {
    regular: 'Figtree_400Regular',
    medium: 'Figtree_500Medium',
    semibold: 'Figtree_600SemiBold',
    bold: 'Figtree_700Bold',
    extrabold: 'Figtree_800ExtraBold',
    black: 'Figtree_900Black',
  },
  sizes: {
    xs: 11,
    sm: 13,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 40,
    display: 64,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
} as const;
