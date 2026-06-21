# What's the Chance — Implementatieplan

**Datum:** 2026-06-21
**Gebaseerd op:** `2026-06-21-whats-the-chance-design.md`

---

## Fase 0 — Design Systeem

Eenmalig opzetten vóór de eerste schermen. Zorgt voor visuele consistentie.

- [ ] Kleurpalet definiëren (`colors.ts`)
  - Achtergrond: `#111111`
  - Primair accent: `#7c6af7` (paars)
  - Tekst: `#ffffff`, `#aaaaaa`
  - Succes: `#4CAF50`, Gevaar: `#ff6b6b`
- [ ] Typografie (`typography.ts`) — display font (bold), body font, groottes
- [ ] Spacing & border radius tokens (`spacing.ts`)
- [ ] Basiscomponenten bouwen:
  - `Button` (paarse primaire knop)
  - `Card` (donkere afgeronde card)
  - `Input` (tekstveld met paarse border)
  - `PlayerChip` (naam-tag met × knop)

---

## Fase 1 — Project Fundament

- [ ] Expo project aanmaken (`npx create-expo-app`)
- [ ] TypeScript configureren
- [ ] Mappenstructuur opzetten (zie design spec)
- [ ] Expo Router installeren en configureren
- [ ] Zustand installeren + `gameStore.ts` aanmaken
- [ ] `DareRepository` interface schrijven
- [ ] `LocalDareRepository` implementatie schrijven
- [ ] Dare JSON bestanden aanmaken met eerste dares:
  - `casual.json` (minimaal 20 dares)
  - `crazy.json` (minimaal 20 dares)
  - `party.json` (minimaal 20 dares)
- [ ] `.gitignore` updaten voor Expo (`node_modules`, `.expo`, `dist`)
- [ ] Committen naar GitHub

---

## Fase 2 — Core Schermen

Per scherm: bouwen → testen op device/simulator → committen.

- [ ] **Home scherm** (`app/index.tsx`)
  - Thema-carousel (horizontaal scrollend)
  - PvP + PvGame knoppen
  - Settings icon
- [ ] **Speler-setup scherm** (`app/setup.tsx`) — alleen PvGame
  - Naam invoeren + toevoegen
  - Spelerlijst met verwijder optie
  - Minimaal 2 spelers vereist
- [ ] **Thema-keuze scherm** (`app/theme.tsx`)
  - Cards per thema (Casual / Crazy / Party)
  - Toggle aan/uit per thema
  - Standaard: Casual aan
- [ ] **Regels scherm** (`app/rules.tsx`)
  - Genummerde lijst, 4 regels
  - Donkere achtergrond
  - "Start" knop onderaan
- [ ] Committen naar GitHub

---

## Fase 3 — PvP Game Loop

- [ ] **Dare scherm PvP** (`app/game/dare-pvp.tsx`)
  - Toont random dare (geen herhaling)
  - "Volgende" knop
  - Reset dare-pool automatisch als alles geweest is
- [ ] Game loop testen met meerdere dares
- [ ] Committen naar GitHub

---

## Fase 4 — PvGame Game Loop

- [ ] **Dare + invoer scherm** (`app/game/input.tsx`)
  - Naam van random gekozen speler tonen
  - Dare tekst
  - "1/X" invoerveld (kans instellen)
  - "Jouw getal" invoerveld
  - Validatie: getal moet binnen range vallen
- [ ] **Reveal scherm** (`app/game/reveal.tsx`)
  - Slot machine animatie (React Native Reanimated)
  - Onthult het random getal van de app
  - Navigeert automatisch naar resultaat
- [ ] **Verloren scherm** (`app/game/result.tsx`)
  - "OUCH! JE HEBT KANS VERLOREN"
  - Dare tekst
  - "OF" scheidingslijn
  - Straf tekst (alternatief bij weigering)
  - "Volgende" knop
- [ ] **Veilig scherm** (`app/game/safe.tsx`)
  - "JE BENT VEILIG!" (visueel ontwerp bepalen tijdens bouw)
  - "Volgende" knop
- [ ] Volledige PvGame loop testen
- [ ] Committen naar GitHub

---

## Fase 5 — Splash Animatie

- [ ] **Splash scherm** (`app/splash.tsx`)
  - Woord-voor-woord reveal: "WHAT'S" → "THE" → "CHANCE"
  - Dan: "LETS GO" scherm
  - Fade/slide animaties via Reanimated
  - Navigeert automatisch naar Home na animatie
- [ ] Committen naar GitHub

---

## Fase 6 — Instellingen & Polish

- [ ] **Instellingen scherm** (`app/settings.tsx`)
  - Taal toggle (NL/EN)
  - Geluid aan/uit
  - Over de app
- [ ] Algemene polish:
  - Overgangen tussen schermen
  - Haptics (trillen bij match/veilig)
  - Lege states (geen dares meer beschikbaar)
- [ ] Testen op iOS én Android
- [ ] Committen naar GitHub

---

## Volgorde samengevat

```
Fase 0 → Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5 → Fase 6
Design    Fundament  Schermen  PvP loop  PvGame   Splash   Polish
systeem
```

Elke fase eindigt met een commit. Per scherm: bouwen → testen → committen.
