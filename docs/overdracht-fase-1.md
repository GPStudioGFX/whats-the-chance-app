# Overdracht — Klaar voor Fase 1

**Datum:** 2026-06-22
**GitHub:** https://github.com/GPStudioGFX/whats-the-chance-app
**Branch:** `main`

---

## Wat er al staat (Fase 0 ✓)

Het project is volledig opgezet en klaar om te bouwen. Niets is nog kapot of half af.

### Expo project
- React Native + Expo 56, TypeScript, Expo Router, Reanimated, Zustand
- Font: **Figtree** geïnstalleerd via `@expo-google-fonts/figtree`
- Root layout (`src/app/_layout.tsx`): laadt Figtree, statusbar light, volledige navigatiestack gedefinieerd

### Design systeem (`src/constants/`)
| Bestand | Inhoud |
|---------|--------|
| `colors.ts` | Volledig kleurpalet op basis van Claude Design |
| `typography.ts` | Figtree font varianten + groottes |
| `spacing.ts` | Spacing stappen + border radius tokens |
| `index.ts` | Re-exporteert alles |

**Kernkleuren:**
- Achtergrond: `#0d0d10`
- Kaarten: `#1c1c20` / `#2a2a2e`
- Accent paars: `#6C5CE7`
- Tekst: `#eef0f3` (primair), `#9a9aa2` (secundair)
- Goud: `#FFD66B` | Succes: `#00C851`

### Basiscomponenten (`src/components/ui/`)
- `Button` — primary (paars met glow) + ghost variant
- `Card` — donkere afgeronde container
- `Input` — tekstveld met paarse border + label
- `PlayerChip` — naam-tag met × knop

### Claude Design bestand
`claude design/Whats The Chance.html` — het visuele design ter referentie voor alle schermen.

---

## Fase 1 — Wat moet er nog gebeuren

### 1. Mappen aanmaken
`src/data/repository/` en `src/data/dares/` en `src/store/` bestaan al als lege mappen. Bestanden daarin nog aanmaken.

### 2. DareRepository interface (`src/data/repository/DareRepository.ts`)
```typescript
export interface Dare {
  id: string;
  text: string;
  punishment: string;        // kleine opdracht bij weigering
  tags: string[];            // 'alc' | 'geld' | 'buiten' | 'avond'
  type: 'normal' | 'group';  // 'group' = v2, nu alleen 'normal' gebruiken
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
```

### 3. LocalDareRepository (`src/data/repository/LocalDareRepository.ts`)
Implementeert `DareRepository`, importeert de JSON bestanden.

**Filterlogica:**
- Alleen dares van type `'normal'`
- Dares zonder tags zijn altijd zichtbaar
- Dares MET tags zijn alleen zichtbaar als die tag in `activeTags` zit
- Slaat `excludeIds` over (geen herhaling), reset pool als alles gezien is

### 4. Dare JSON bestanden
Minimaal 20 dares per thema. Structuur:
```json
[
  {
    "id": "casual_001",
    "text": "Vertel je meest embarrassante moment",
    "punishment": "Doe 10 push-ups",
    "tags": [],
    "type": "normal"
  }
]
```

**Bestanden:**
- `src/data/dares/casual.json` — lichte dares, geen zware tags
- `src/data/dares/crazy.json` — gekke/bizarre dares
- `src/data/dares/party.json` — feest dares, sommige met `alc` of `luidruchtig` tag

### 5. Zustand gameStore (`src/store/gameStore.ts`)
```typescript
type GameMode = 'pvp' | 'pvgame';

interface Player {
  id: string;
  name: string;
}

interface GameSettings {
  availableTags: string[];       // ter beschikking: ['alc', 'geld', ...]
  normalDares: boolean;          // altijd true
  groupDares: boolean;           // v2, altijd false
  pointSystem: boolean;          // v2, altijd false
  smallTask: boolean;            // straf: altijd true
  pointLoss: boolean;            // v2, altijd false
  drinks: boolean;               // v2, altijd false
}

interface GameState {
  mode: GameMode | null;
  players: Player[];
  selectedThemeIds: string[];
  usedDareIds: string[];
  currentDare: Dare | null;
  settings: GameSettings;

  // Actions
  setMode: (mode: GameMode) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  setThemes: (ids: string[]) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  setCurrentDare: (dare: Dare) => void;
  markDareUsed: (id: string) => void;
  resetGame: () => void;
}
```

### 6. TypeScript path alias controleren
`tsconfig.json` moet `"@/*": ["./src/*"]` hebben zodat `import { colors } from '@/constants'` werkt.

---

## Spellogica samenvatting (ter referentie)

### PvP
- Geen speler-setup — spelers wijzen zelf aan wie de dare doet
- App toont random dare (geen herhaling, reset na uitgeput)
- Tap "Volgende" → volgende dare

### PvGame
- Spelers worden toegevoegd (minimaal 2)
- App kiest random welke speler de dare krijgt
- Speler vult: kans (1/X) + eigen getal
- App genereert random getal 1–X
- Slot machine animatie → reveal
- Match: verloren scherm (dare + kleine opdracht als alternatief)
- Geen match: veilig scherm

### Dare filtering
- Dares zonder tags → altijd zichtbaar
- Dare met tag `alc` → alleen als "Alcohol" aan staat in game instellingen
- Tags: `alc`, `geld`, `buiten`, `avond`

---

## Volgende stap na Fase 1

**Fase 2 — Core schermen** (volgorde):
1. Home scherm (`src/app/index.tsx`) — thema carousel, PvP/PvGame knoppen
2. Speler setup (`src/app/setup.tsx`) — alleen PvGame
3. Thema kiezen (`src/app/theme.tsx`)
4. Game instellingen (`src/app/game-settings.tsx`) — ter beschikking + spelsituatie + straf toggles
5. Regels (`src/app/rules.tsx`)

**Referentiebestanden:**
- Design spec: `docs/superpowers/specs/2026-06-21-whats-the-chance-design.md`
- Implementatieplan: `docs/superpowers/specs/2026-06-21-implementatieplan.md`
- Claude Design: `claude design/Whats The Chance.html`

---

## Regels (altijd volgen)
1. Na elke fase → commit + push naar GitHub
2. Changelog updaten bij elke wijziging
3. `project.md` updaten als features wijzigen
4. Nooit direct JSON importeren in schermen — altijd via `DareRepository`
5. Geen scope creep — v2 features staan in de spec maar worden nu niet gebouwd
