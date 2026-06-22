import { create } from 'zustand';
import { Dare } from '@/data/repository/DareRepository';

type GameMode = 'pvp' | 'pvgame';

interface Player {
  id: string;
  name: string;
}

interface GameSettings {
  availableTags: string[];
  normalDares: boolean;
  groupDares: boolean;
  pointSystem: boolean;
  smallTask: boolean;
  pointLoss: boolean;
  drinks: boolean;
}

interface GameState {
  mode: GameMode | null;
  players: Player[];
  selectedThemeIds: string[];
  usedDareIds: string[];
  currentDare: Dare | null;
  settings: GameSettings;

  setMode: (mode: GameMode) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setThemes: (ids: string[]) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  setCurrentDare: (dare: Dare) => void;
  markDareUsed: (id: string) => void;
  resetGame: () => void;
}

const defaultSettings: GameSettings = {
  availableTags: [],
  normalDares: true,
  groupDares: false,
  pointSystem: false,
  smallTask: true,
  pointLoss: false,
  drinks: false,
};

export const useGameStore = create<GameState>()((set) => ({
  mode: null,
  players: [],
  selectedThemeIds: [],
  usedDareIds: [],
  currentDare: null,
  settings: defaultSettings,

  setMode: (mode) => set({ mode }),

  addPlayer: (name) =>
    set((state) => ({
      players: [...state.players, { id: `${Date.now()}-${Math.random()}`, name: name.trim() }],
    })),

  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    })),

  setThemes: (ids) => set({ selectedThemeIds: ids }),

  updateSettings: (partial) =>
    set((state) => ({
      settings: { ...state.settings, ...partial },
    })),

  setCurrentDare: (dare) => set({ currentDare: dare }),

  markDareUsed: (id) =>
    set((state) => ({
      usedDareIds: [...state.usedDareIds, id],
    })),

  resetGame: () =>
    set({
      mode: null,
      players: [],
      selectedThemeIds: [],
      usedDareIds: [],
      currentDare: null,
      settings: defaultSettings,
    }),
}));
