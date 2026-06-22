export interface Dare {
  id: string;
  text: string;
  punishment: string;
  tags: string[];
  type: 'normal' | 'group';
}

export interface Theme {
  id: string;
  name: string;
  isPremium: boolean;
  dares: Dare[];
}

export interface DareRepository {
  getThemes(): Theme[];
  getRandomDare(themeIds: string[], excludeIds: string[], activeTags: string[]): Dare | null;
}
