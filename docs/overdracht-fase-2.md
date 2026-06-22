# Overdracht — Klaar voor Fase 3

**Datum:** 2026-06-22
**GitHub:** https://github.com/GPStudioGFX/whats-the-chance-app
**Branch:** `main`

---

## Wat er al staat (Fase 0 t/m 2 ✓)

### Fase 0 — Project setup
- React Native + Expo 56, TypeScript, Expo Router, Reanimated, Zustand
- Font: Figtree via `@expo-google-fonts/figtree`
- Root layout (`src/app/_layout.tsx`): fonts laden, StatusBar, volledige navigatiestack

### Fase 0 — Design systeem (`src/constants/`)
| Token | Bestand |
|-------|---------|
| Kleuren | `colors.ts` — background `#0d0d10`, accent `#6C5CE7`, gold `#FFD66B`, success `#00C851` |
| Typografie | `typography.ts` — Figtree varianten + groottes (xs→display) |
| Spacing | `spacing.ts` — spacing stappen + border radius tokens |

### Fase 0 — Basiscomponenten (`src/components/ui/`)
- `Button` — primary (paars met glow) + ghost variant, height 56, radius full
- `Card` — donkere afgeronde container, elevated variant
- `Input` — tekstveld met paarse border, label boven
- `PlayerChip` — naam-tag met × knop, flex-wrap compatible

### Fase 1 — Data laag
- `src/data/repository/DareRepository.ts` — interfaces: `Dare`, `Theme`, `DareRepository`
- `src/data/repository/LocalDareRepository.ts` — implementatie met filterlogica + pool-reset
- `src/data/dares/casual.json` — 22 dares, geen tags
- `src/data/dares/crazy.json` — 22 bizarre dares, geen tags
- `src/data/dares/party.json` — 24 dares, sommige met `alc` / `buiten` / `avond` tag

**Filterlogica:**
- Dare zonder tags → altijd zichtbaar
- Dare MET tag → alleen zichtbaar als die tag in `activeTags` zit
- `excludeIds` sluit geziene dares uit; pool reset automatisch als alles gezien is

### Fase 1 — Store (`src/store/gameStore.ts`)
Zustand v5 store met:
```typescript
mode: 'pvp' | 'pvgame' | null
players: { id: string; name: string }[]
selectedThemeIds: string[]
usedDareIds: string[]
currentDare: Dare | null
settings: {
  availableTags: string[]   // actieve tag-filters: 'alc' | 'geld' | 'buiten' | 'avond'
  normalDares: boolean      // altijd true
  groupDares: boolean       // v2, altijd false
  pointSystem: boolean      // v2, altijd false
  smallTask: boolean        // altijd true
  pointLoss: boolean        // v2, altijd false
  drinks: boolean           // v2, altijd false
}
// Actions: setMode, addPlayer, removePlayer, setThemes, updateSettings,
//          setCurrentDare, markDareUsed, resetGame
```

### Fase 2 — Core schermen
Alle setup-schermen zijn gebouwd en navigeren correct naar elkaar.

| Scherm | Bestand | Wat het doet |
|--------|---------|--------------|
| Home | `src/app/index.tsx` | Thema-carousel, PvP/PvGame knoppen, settings icon rechtsboven |
| Speler setup | `src/app/setup.tsx` | Naam invoeren + toevoegen, PlayerChips, min. 2 vereist, doorgaan disabled tot 2+ spelers |
| Thema kiezen | `src/app/theme.tsx` | Toggle per thema (Casual/Crazy/Party), min. 1 verplicht, colored border bij selectie |
| Game instellingen | `src/app/game-settings.tsx` | Ter beschikking filters (alc/geld/buiten/avond), v2-items grijs uitgeschakeld |
| Spelregels | `src/app/rules.tsx` | 4 regels per mode, navigeert naar `/game/dare` (PvP) of `/game/input` (PvGame) |

**Navigatieflow:**
- PvP: Home → Thema → Game-instellingen → Regels → `game/dare` *(nog niet gebouwd)*
- PvGame: Home → Setup → Thema → Game-instellingen → Regels → `game/input` *(nog niet gebouwd)*

---

## Fase 3 — PvP game loop (volgende stap)

Alle bestanden komen in `src/app/game/`.

### Dare scherm PvP (`src/app/game/dare.tsx`)

**Wat het doet:**
- Toont de huidige dare tekst centraal op het scherm
- "Volgende" knop onderaan
- Elke tap: haalt een nieuwe random dare op via `LocalDareRepository.getRandomDare()`
- Slaat gebruikte dare op via `markDareUsed(id)` in de store
- Pool-reset zit al in `LocalDareRepository` — geen extra logica nodig in het scherm

**Hoe dare ophalen:**
```typescript
import { LocalDareRepository } from '@/data/repository/LocalDareRepository';
import { useGameStore } from '@/store/gameStore';

const repo = new LocalDareRepository();
const { selectedThemeIds, usedDareIds, settings, markDareUsed, setCurrentDare } = useGameStore();

function loadNextDare() {
  const dare = repo.getRandomDare(selectedThemeIds, usedDareIds, settings.availableTags);
  if (!dare) return; // kan niet als pool correct reset
  setCurrentDare(dare);
  markDareUsed(dare.id);
}
```

**UI:**
- Achtergrond: `colors.background`
- Dare tekst: groot, gecentreerd, `typography.fonts.bold`, `colors.textPrimary`
- Eventueel een subtiele Card als container voor de tekst
- "Volgende" knop: `Button` primary onderaan
- Optioneel: dare-teller bovenaan (bijv. "3 gezien")

### Na fase 3: testen
- Meerdere keren "Volgende" tikken → dares wisselen
- Alle dares gezien → pool reset en dares herhalen
- Filters testen: alcohol-dare niet zichtbaar als `alc` niet actief is

### Committen na testen

---

## Fase 4 — PvGame game loop

### 1. Dare + invoer (`src/app/game/input.tsx`)

**Wat het doet:**
- Toont naam van random gekozen speler bovenaan
- Toont dare tekst
- Twee invoervelden:
  - "1 op X" — speler vult de kansgrootte in (bijv. 10 voor 1 op 10). Minimaal 2.
  - "Jouw getal" — speler vult een getal in tussen 1 en X
- Validatie: beide velden ingevuld, getal binnen 1–X
- "Bevestig" knop → navigeert naar `game/reveal`

**Random speler kiezen:**
```typescript
const { players } = useGameStore();
const randomPlayer = players[Math.floor(Math.random() * players.length)];
```
Kies de speler op mount (useEffect of useState init), sla op in locale state.

**Wat doorgeven naar reveal:**
Sla `x` (kansgrootte) op in de store of geef via route params mee. Eenvoudigst: gebruik `router.push` met params:
```typescript
router.push({ pathname: '/game/reveal', params: { x: xValue.toString() } });
```

### 2. Reveal animatie (`src/app/game/reveal.tsx`)

**Wat het doet:**
- Ontvangt `x` via `useLocalSearchParams()`
- Genereert random getal: `Math.floor(Math.random() * x) + 1`
- Slot machine animatie via **Reanimated**: cijfers scrollen omhoog/omlaag en stoppen op het resultaat
- Na animatie (bijv. 2 seconden): navigeer automatisch naar `game/result` of `game/safe`

**Match bepalen:**
```typescript
const appGetal = Math.floor(Math.random() * x) + 1;
// vergelijk met het getal dat de speler heeft ingevoerd (ook via params meegeven)
const isMatch = appGetal === spelerGetal;
router.replace({ pathname: isMatch ? '/game/result' : '/game/safe', params: { dare: currentDare.text, punishment: currentDare.punishment } });
```

**Animatie-idee (Reanimated):**
- Gebruik `useSharedValue` + `withTiming` of `withSequence`
- Laat een getal snel wisselen (willekeurige cijfers) en vertraag dan tot het eindgetal
- Houd het simpel: één groot getal dat "rolt"

### 3. Verloren scherm (`src/app/game/result.tsx`)

**Wat het toont:**
- Koptekst: `"OUCH!"` (groot, rood/gold)
- Subtitel: `"Je hebt de kans verloren"`
- Dare tekst (ontvangen via params)
- `"OF"` scheidingslijn
- Straf tekst / kleine opdracht (ontvangen via params)
- "Volgende" knop → terug naar `game/input` voor de volgende speler

### 4. Veilig scherm (`src/app/game/safe.tsx`)

**Wat het toont:**
- Koptekst: `"VEILIG!"` (groot, groen)
- Visueel ontwerp vrij te bepalen — feestelijk, luchtig
- "Volgende" knop → terug naar `game/input` voor de volgende speler

### Na fase 4: testen
- Volledige PvGame loop: input → reveal → result of safe → volgende speler
- Match scenario testen (zelfde getal)
- Geen-match scenario testen
- Committen

---

## Fase 5 — Splash animatie

**Scherm:** `src/app/splash.tsx` (of als initieel scherm in `_layout.tsx`)

**Wat het doet:**
- Woord-voor-woord reveal via Reanimated: `"WHAT'S"` → `"THE"` → `"CHANCE"`
- Daarna tekst: `"LETS GO"` of iets visueel krachtig
- Navigeert automatisch naar Home na de animatie (geen knop)
- Gebruik `withDelay` + `withTiming` voor fade-in per woord

**Let op:** zorg dat de splash maar één keer speelt per app-open, niet bij elke navigatie. Gebruik `router.replace('/') ` zodat de splash niet in de back-stack zit.

---

## Fase 6 — Instellingen & polish

1. **App instellingen** (`src/app/settings.tsx`) — taal (NL/EN), geluid aan/uit, over de app
2. **Schermovergangen** verfijnen — Expo Router ondersteunt custom transitions
3. **Haptics** toevoegen via `expo-haptics`:
   - Match → `Haptics.notificationAsync(NotificationFeedbackType.Error)`
   - Veilig → `Haptics.notificationAsync(NotificationFeedbackType.Success)`
4. **Lege state** afhandelen: als geen dares beschikbaar zijn voor actieve filters → toon melding
5. **Testen op iOS én Android**
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
3. Nooit direct JSON importeren in schermen — altijd via `LocalDareRepository`
4. Geen scope creep — v2 features worden nu niet gebouwd
5. Path alias `@/` werkt via `tsconfig.json` → gebruik altijd `@/` imports, nooit relatieve paden van buiten `src/`

---

## Node / tooling info
- Node v20.20.2 via nvm (standaard ingesteld, werkt in nieuwe terminal)
- `npx expo run:ios` voor simulator (Expo Go werkt niet met SDK 56)
- TypeScript check: `npx tsc --noEmit` (2 pre-existing errors in Expo boilerplate, niet van ons)
