# Changelog

Alle noemenswaardige wijzigingen aan dit project worden hier bijgehouden.

---

## [Unreleased]

### Toegevoegd — Fase 3: PvP game loop
- Dare scherm (`src/app/game/dare.tsx`): toont random dare uit geselecteerde thema's, "Volgende" knop laadt volgende dare, teller bovenaan, "← Stop" reset spel en keert terug naar Home

### Toegevoegd — Fase 2: Core schermen
- Home scherm (`src/app/index.tsx`): thema-carousel, PvP + PvGame knoppen, settings icon
- Speler setup (`src/app/setup.tsx`): naam invoeren, PlayerChips, minimaal 2 vereist, doorgaan naar thema
- Thema kiezen (`src/app/theme.tsx`): card + toggle per thema, minimaal 1 verplicht
- Game instellingen (`src/app/game-settings.tsx`): drie secties — ter beschikking (filters), spelsituatie, straf; v2-opties grijs uitgeschakeld
- Spelregels (`src/app/rules.tsx`): 4 regels per mode (PvP/PvGame), navigeert naar juiste game-scherm

### Toegevoegd — Fase 1: Data laag & store
- `DareRepository` interface: `Dare`, `Theme`, `DareRepository` types (`src/data/repository/DareRepository.ts`)
- `LocalDareRepository`: implementatie met filterlogica en automatische pool-reset (`src/data/repository/LocalDareRepository.ts`)
- Dare JSON bestanden: 22 casual / 22 crazy / 24 party dares in het Nederlands (`src/data/dares/`)
- Filterlogica: dares zonder tags altijd zichtbaar; dares met tag alleen zichtbaar als die tag actief is in `availableTags`
- `useGameStore` Zustand v5 store: mode, players, themes, usedDareIds, settings en alle actions (`src/store/gameStore.ts`)

### Toegevoegd — Fase 0
- Project opgezet met design spec, implementatieplan, projectdocumentatie en regels
- Flowchart en wireframes (Figma) toegevoegd aan repository
- Expo 56 project opgezet met TypeScript, Expo Router en Reanimated
- Design systeem: `colors`, `typography`, `spacing` tokens in `src/constants/`
- Basiscomponenten: `Button`, `Card`, `Input`, `PlayerChip`
- Zustand geïnstalleerd voor spelsessie state
- Design spec uitgebreid: game instellingen scherm, ter beschikking filters, spelsituatie toggles, straf opties, groepsvragen mechanic (v2)
- Design systeem gesynchroniseerd met Claude Design: Figtree font, #6C5CE7 accent, #0d0d10 achtergrond, crème tekst (#eef0f3)
- Root layout opgezet met Figtree font loading, StatusBar en volledige scherm navigatiestack
- Claude Design bestand toegevoegd aan repository (`claude design/`)
