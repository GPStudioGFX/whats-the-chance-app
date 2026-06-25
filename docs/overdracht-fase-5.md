# Overdracht — Klaar voor Fase 5

**Datum:** 2026-06-25
**GitHub:** https://github.com/GPStudioGFX/whats-the-chance-app
**Branch:** `main`
**Mappad:** `~/Desktop/Whats-the-chance`

---

## Wat er al staat (Fase 0 t/m 4 ✓)

### Fase 0 — Project setup & design systeem
- React Native + Expo 56, TypeScript, Expo Router, Reanimated, Zustand
- Font: Figtree via `@expo-google-fonts/figtree`
- Root layout (`src/app/_layout.tsx`): fonts laden, StatusBar, volledige navigatiestack
- Design tokens in `src/constants/`: `colors.ts`, `typography.ts`, `spacing.ts`
- Basiscomponenten in `src/components/ui/`: `Button`, `Card`, `Input`, `PlayerChip`

### Fase 1 — Data laag
- `src/data/repository/DareRepository.ts` — interfaces: `Dare`, `Theme`, `DareRepository`
- `src/data/repository/LocalDareRepository.ts` — filterlogica + pool-reset
- `src/data/dares/casual.json` — 22 dares
- `src/data/dares/crazy.json` — 22 dares
- `src/data/dares/party.json` — 24 dares (tags: `alc`, `buiten`, `avond`)

### Fase 2 — Core schermen
| Scherm | Bestand | Wat het doet |
|--------|---------|--------------|
| Home | `src/app/index.tsx` | Thema-carousel, PvP/PvGame knoppen |
| Speler setup | `src/app/setup.tsx` | Naam invoeren, min. 2 vereist |
| Thema kiezen | `src/app/theme.tsx` | Toggle per thema, min. 1 verplicht |
| Game instellingen | `src/app/game-settings.tsx` | Ter beschikking filters |
| Spelregels | `src/app/rules.tsx` | Navigeert naar juiste game-scherm |

### Fase 3 — PvP dare scherm
- `src/app/game/dare.tsx` — toont dares, teller, "Volgende" + "← Stop"

### Fase 4 — PvGame game loop ✓
- `src/app/game/input.tsx` — random speler, dare tonen, X en getal invoeren
- `src/app/game/reveal.tsx` — slot machine animatie via Reanimated
- `src/app/game/result.tsx` — "OUCH!" + dare + straf
- `src/app/game/safe.tsx` — "VEILIG!" scherm

**Navigatieflow:**
- PvP: Home → Thema → Game-instellingen → Regels → `game/dare`
- PvGame: Home → Setup → Thema → Game-instellingen → Regels → `game/input` → `game/reveal` → `game/result` of `game/safe`

---

## iOS native project (nieuw in deze sessie)

De `ios/` map is nu toegevoegd aan de repo (bare workflow). Dit is nodig omdat Expo Go niet werkt met SDK 56.

**Wat er in zit:**
- `ios/WhatstheChance.xcworkspace` — open dit in Xcode
- `ios/WhatstheChance.xcodeproj/project.pbxproj` — bevat fix voor SwiftUICore linker bug
- `ios/Podfile` + `ios/Podfile.lock`
- `ios/Pods/` en `ios/build/` zijn genegeerd via `ios/.gitignore`

**SwiftUICore fix (al aanwezig in project.pbxproj):**
`-weak_framework SwiftUICore` staat in `OTHER_LDFLAGS` voor beide build configs (Debug + Release). Dit fixt een linker bug met `expo-glass-effect` (dat via `expo-router` meekomt als transitive dep).

**`expo-glass-effect` verwijderd als directe dependency** uit `package.json` — maar het blijft geïnstalleerd als transitieve dep van `expo-router`. Geen actie nodig.

---

## App starten (iOS simulator)

**Eerste keer of na clean:**
```bash
rm -rf node_modules && npm install
cd ios && pod install && cd ..
```

**Daarna elke keer:**

Venster 1 — JS bundler:
```bash
npx expo start
```

Venster 2 — open Xcode:
```bash
open ios/WhatstheChance.xcworkspace
```
Kies simulator → druk ▶

**Of via CLI (als node_modules gezond zijn):**
```bash
npx expo run:ios
```

---

## Fase 5 — Splash animatie (volgende stap)

**Scherm:** `src/app/splash.tsx`

- Woord-voor-woord reveal via Reanimated: `"WHAT'S"` → `"THE"` → `"CHANCE"`
- Daarna: `"LETS GO"` of visueel krachtig tekstmoment
- Navigeert automatisch naar Home (`router.replace('/')`) — niet in back-stack
- Gebruik `withDelay` + `withTiming` voor fade-in per woord
- Speelt maar één keer per app-open

**Registreer in `_layout.tsx`** als eerste route vóór de rest van de navigator.

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
- Expo Go werkt NIET met SDK 56 → altijd `npx expo run:ios` of Xcode
- TypeScript check: `npx tsc --noEmit`
