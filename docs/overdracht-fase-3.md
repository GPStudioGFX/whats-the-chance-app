# Overdracht — Klaar voor Fase 4

**Datum:** 2026-06-24
**GitHub:** https://github.com/GPStudioGFX/whats-the-chance-app
**Branch:** `main`
**Mappad:** `~/Desktop/Whats-the-chance` *(zonder spaties)*

---

## Wat er al staat (Fase 0 t/m 3 ✓)

### Fase 0 — Project setup & design systeem
- React Native + Expo 56, TypeScript, Expo Router, Reanimated, Zustand
- Font: Figtree via `@expo-google-fonts/figtree`
- Root layout (`src/app/_layout.tsx`): fonts laden, StatusBar, volledige navigatiestack
- Design tokens in `src/constants/`: `colors.ts`, `typography.ts`, `spacing.ts`
- Basiscomponenten in `src/components/ui/`: `Button`, `Card`, `Input`, `PlayerChip`

### Fase 1 — Data laag
- `src/data/repository/DareRepository.ts` — interfaces: `Dare`, `Theme`, `DareRepository`
- `src/data/repository/LocalDareRepository.ts` — filterlogica + pool-reset
- `src/data/dares/casual.json` — 22 dares (geen tags)
- `src/data/dares/crazy.json` — 22 dares (geen tags)
- `src/data/dares/party.json` — 24 dares (sommige: `alc` / `buiten` / `avond`)

**Filterlogica:** dare zonder tags → altijd zichtbaar. Dare MÉT tag → alleen zichtbaar als die tag in `availableTags` zit. Pool reset automatisch als alles gezien is.

### Fase 1 — Store (`src/store/gameStore.ts`)
Zustand v5 store:
```typescript
mode: 'pvp' | 'pvgame' | null
players: { id: string; name: string }[]
selectedThemeIds: string[]
usedDareIds: string[]
currentDare: Dare | null
settings: {
  availableTags: string[]   // 'alc' | 'geld' | 'buiten' | 'avond'
  normalDares: boolean      // altijd true
  groupDares: boolean       // v2
  pointSystem: boolean      // v2
  smallTask: boolean        // altijd true
  pointLoss: boolean        // v2
  drinks: boolean           // v2
}
// Actions: setMode, addPlayer, removePlayer, setThemes, updateSettings,
//          setCurrentDare, markDareUsed, resetGame
```

### Fase 2 — Core schermen (allemaal gecommit)

| Scherm | Bestand | Wat het doet |
|--------|---------|--------------|
| Home | `src/app/index.tsx` | Thema-carousel, PvP/PvGame knoppen, settings icon |
| Speler setup | `src/app/setup.tsx` | Naam invoeren, PlayerChips, min. 2 vereist |
| Thema kiezen | `src/app/theme.tsx` | Toggle per thema, min. 1 verplicht |
| Game instellingen | `src/app/game-settings.tsx` | Ter beschikking filters, v2-items grijs |
| Spelregels | `src/app/rules.tsx` | 4 regels per mode, navigeert naar juiste game-scherm |

**Navigatieflow:**
- PvP: Home → Thema → Game-instellingen → Regels → `game/dare`
- PvGame: Home → Setup → Thema → Game-instellingen → Regels → `game/input`

### Fase 3 — PvP dare scherm (gebouwd, nog NIET gecommit)

`src/app/game/dare.tsx` is klaar en werkt:
- Toont random dare uit geselecteerde thema's
- "Volgende" knop laadt volgende dare
- Teller bovenaan (`X gezien`)
- "← Stop" reset spel en gaat terug naar Home

**Eerste actie in nieuw venster: commit + push fase 3.**
```bash
git add src/app/game/dare.tsx changelog.md
git commit -m "PvP dare scherm: fase 3 compleet"
git push
```

---

## Fase 4 — PvGame game loop (volgende stap)

Alle bestanden komen in `src/app/game/`.

### 1. Dare + invoer (`src/app/game/input.tsx`)

**Wat het doet:**
- Kiest een random speler bij mount, toont naam bovenaan
- Toont de huidige dare tekst
- Twee invoervelden:
  - `"1 op X"` — kansgrootte (minimaal 2)
  - `"Jouw getal"` — getal tussen 1 en X
- Validatie: beide velden ingevuld, getal binnen 1–X
- "Bevestig" knop → navigeert naar `game/reveal`

**Random speler kiezen:**
```typescript
const { players } = useGameStore();
const [player] = useState(() => players[Math.floor(Math.random() * players.length)]);
```

**Navigeren naar reveal:**
```typescript
router.push({ pathname: '/game/reveal', params: { x: xValue.toString(), spelerGetal: spelerGetal.toString() } });
```

### 2. Reveal animatie (`src/app/game/reveal.tsx`)

**Wat het doet:**
- Ontvangt `x` en `spelerGetal` via `useLocalSearchParams()`
- Genereert random getal: `Math.floor(Math.random() * x) + 1`
- Slot machine animatie via Reanimated: cijfers scrollen en stoppen op het resultaat
- Na animatie: navigeer naar `game/result` (match) of `game/safe` (geen match)

**Match bepalen:**
```typescript
const { x, spelerGetal } = useLocalSearchParams<{ x: string; spelerGetal: string }>();
const appGetal = Math.floor(Math.random() * Number(x)) + 1;
const isMatch = appGetal === Number(spelerGetal);
router.replace({
  pathname: isMatch ? '/game/result' : '/game/safe',
  params: { dare: currentDare.text, punishment: currentDare.punishment ?? '' },
});
```

**Animatie (Reanimated):**
- `useSharedValue` + `withSequence` + `withTiming`
- Laat een getal snel wisselen (willekeurig), vertraag dan tot eindgetal
- Houd het simpel: één groot getal dat "rolt"

### 3. Verloren scherm (`src/app/game/result.tsx`)

**Toont:**
- Koptekst: `"OUCH!"` (groot, rood of gold)
- Subtitel: `"Je hebt de kans verloren"`
- Dare tekst (via params)
- `"OF"` scheidingslijn
- Straf / kleine opdracht (via params)
- "Volgende" knop → terug naar `game/input`

### 4. Veilig scherm (`src/app/game/safe.tsx`)

**Toont:**
- Koptekst: `"VEILIG!"` (groot, groen)
- Feestelijk / luchtig design (vrij te bepalen)
- "Volgende" knop → terug naar `game/input`

**Na fase 4 testen:**
- Volledige PvGame loop: input → reveal → result of safe → volgende speler
- Match en geen-match scenario
- Committen

---

## Fase 5 — Splash animatie

**Scherm:** `src/app/splash.tsx`

- Woord-voor-woord reveal via Reanimated: `"WHAT'S"` → `"THE"` → `"CHANCE"`
- Daarna tekst: `"LETS GO"` of iets visueel krachtig
- Navigeert automatisch naar Home (`router.replace('/')`) — niet in back-stack
- Gebruik `withDelay` + `withTiming` voor fade-in per woord
- Speelt maar één keer per app-open

---

## Fase 6 — Instellingen & polish

1. **App instellingen** (`src/app/settings.tsx`) — taal NL/EN, geluid aan/uit, over de app
2. **Schermovergangen** verfijnen via Expo Router custom transitions
3. **Haptics** via `expo-haptics`:
   - Match → `Haptics.notificationAsync(NotificationFeedbackType.Error)`
   - Veilig → `Haptics.notificationAsync(NotificationFeedbackType.Success)`
4. **Lege state:** geen dares beschikbaar voor actieve filters → toon melding
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
3. Nooit direct JSON importeren in schermen — altijd via `LocalDareRepository`
4. Geen scope creep — v2 features worden nu niet gebouwd
5. Path alias `@/` werkt via `tsconfig.json` → gebruik altijd `@/` imports

---

## Node / tooling info

- Node v20.20.2 via nvm
- `npx expo run:ios` voor simulator (Expo Go werkt niet met SDK 56)
- TypeScript check: `npx tsc --noEmit` (2 pre-existing errors in Expo boilerplate, niet van ons)
- Map hernoemd naar `Whats-the-chance` (geen spaties) — dit lost iOS build problemen op
