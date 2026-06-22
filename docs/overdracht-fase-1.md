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

## Alle resterende fases

### Fase 2 — Core schermen
Volgorde bouwen → testen → committen per scherm.

1. **Home** (`src/app/index.tsx`) — thema-carousel (horizontaal scrollend), PvP + PvGame knoppen, settings icon rechtsboven
2. **Speler setup** (`src/app/setup.tsx`) — alleen PvGame; naam invoeren, PlayerChip per speler, minimaal 2 vereist
3. **Thema kiezen** (`src/app/theme.tsx`) — Card per thema (Casual/Crazy/Party), toggle aan/uit, minimaal 1 verplicht
4. **Game instellingen** (`src/app/game-settings.tsx`) — drie secties met toggles:
   - Ter beschikking: Alcohol / Geld / Buiten / Avond (werkt in v1, filtert dares)
   - Spelsituatie: Normale vragen (aan, niet uitschakelbaar), Groepsvragen (grijs/uitgeschakeld v2), Puntensysteem (grijs/uitgeschakeld v2)
   - Straf: Kleine opdracht (aan v1), Puntenverlies (grijs v2), Slokken (grijs v2)
5. **Regels** (`src/app/rules.tsx`) — genummerde lijst 4 regels, donkere achtergrond, "Start" knop

### Fase 3 — PvP game loop
1. **Dare scherm PvP** (`src/app/game/dare.tsx`) — toont huidige dare tekst, "Volgende" knop onderaan, random dare uit `DareRepository` met `usedDareIds` uitsluiting, auto-reset als pool leeg is
2. Volledige PvP loop testen (meerdere dares, reset)
3. Committen

### Fase 4 — PvGame game loop
1. **Dare + invoer** (`src/app/game/input.tsx`) — naam van random gekozen speler bovenaan, dare tekst, twee invoervelden: "1/X" (kans instellen) + "Jouw getal" (moet binnen 1–X vallen), validatie, bevestig knop
2. **Reveal animatie** (`src/app/game/reveal.tsx`) — slot machine animatie via Reanimated die het random app-getal onthult (cijfer voor cijfer), navigeert automatisch naar result na animatie
3. **Verloren scherm** (`src/app/game/result.tsx`) — "OUCH! JE HEBT KANS VERLOREN", dare tekst, "OF" scheidingslijn, straf tekst (kleine opdracht), "Volgende" knop
4. **Veilig scherm** (`src/app/game/safe.tsx`) — "JE BENT VEILIG!", visueel ontwerp vrij te bepalen, "Volgende" knop
5. Volledige PvGame loop testen (match + geen match)
6. Committen

### Fase 5 — Splash animatie
1. **Splash scherm** (`src/app/splash.tsx` of als initieel scherm in `_layout.tsx`) — woord-voor-woord reveal via Reanimated: "WHAT'S" → "THE" → "CHANCE", daarna "LETS GO", navigeert automatisch naar Home
2. Testen op device
3. Committen

### Fase 6 — Instellingen & polish
1. **App instellingen** (`src/app/settings.tsx`) — taal (NL/EN), geluid aan/uit, over de app
2. Schermovergangen verfijnen
3. Haptics toevoegen (trillen bij match/veilig) via `expo-haptics`
4. Lege states afhandelen (bijv. geen dares beschikbaar voor actieve filters)
5. Testen op iOS én Android
6. Committen

---

## Referentiebestanden
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
