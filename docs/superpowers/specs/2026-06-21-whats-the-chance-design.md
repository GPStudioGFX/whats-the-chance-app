# What's the Chance — Design Spec

**Datum:** 2026-06-21
**Platform:** iOS + Android (React Native + Expo)
**Status:** Goedgekeurd

---

## Wat is de app?

What's the Chance is een party game app gebaseerd op het bekende spel "Wat is de kans dat". Spelers krijgen een dare te zien. Eén speler stelt een kans voor (bijv. 1 op 10). Beide partijen kiezen een getal — als ze matchen, moet de dare gedaan worden.

---

## Game Modi

### PvP (Speler vs Speler)
- 2 of meer spelers, geen maximum
- De app is een dare-deck: toont een random dare
- Spelers wijzen zelf aan wie de dare doet (zoals in het echte spel)
- Spelers doen het getallenspel **mondeling** (zeggen getallen hardop)
- Na de dare tikt de groep op **"Volgende"** om de volgende dare te zien
- De app houdt geen getallen of beurten bij — spelers regelen dat zelf

### PvGame (Speler vs App)
- 2 of meer spelers, geen maximum
- De **app kiest random** welke speler de dare krijgt
- Die speler vult in: de kans (bijv. 1/10) en zijn eigen getal
- De app genereert een random getal binnen de gekozen range
- Slot machine animatie onthult het getal van de app
- **Match** → Verloren scherm (dare + straf als alternatief)
- **Geen match** → Veilig scherm
- Daarna kiest de app opnieuw een random speler

---

## Schermflow

```
App Start
  └── Splash (WHAT'S / THE / CHANCE animatie, woord voor woord)
        └── Home (thema-carousel + PvP / PvGame knoppen + instellingen)
              ├── PvP
              │     ├── Thema kiezen
              │     ├── Regels (4 stappen)
              │     ├── LETS GO scherm
              │     └── GAME LOOP:
              │           Dare scherm (random dare, geen herhaling)
              │           Spelers wijzen zelf aan wie het doet
              │           → [Volgende] → ↺
              │
              └── PvGame
                    ├── Spelers toevoegen
                    ├── Thema kiezen
                    ├── Regels (4 stappen)
                    ├── LETS GO scherm
                    └── GAME LOOP:
                          App kiest random speler
                          → Dare scherm + getal invoer (1/X + eigen getal)
                          → Reveal animatie (slot machine)
                          → MATCH: Verloren scherm (dare + straf-optie)
                          → GEEN MATCH: Veilig scherm
                          → ↺ app kiest volgende speler
```

---

## Schermen

| Scherm | Beschrijving |
|--------|-------------|
| Splash | Woord-voor-woord reveal: "WHAT'S" → "THE" → "CHANCE", dan "LETS GO" |
| Home | Thema-carousel (horizontaal scrollen), PvP + PvGame knop, settings icon |
| Spelers toevoegen | Naam invoeren, tags tonen, speler toevoegen via + knop |
| Thema kiezen | Cards met thema's (Casual, Crazy, Party), toggle aan/uit |
| Regels | Genummerde lijst (4 regels) op donkere achtergrond |
| Dare (PvP) | Dare tekst + "Volgende" knop (spelers wijzen zelf aan wie het doet) |
| Dare + invoer (PvGame) | Naam van random gekozen speler + dare tekst + "1/X" veld + "Jouw getal" veld + bevestig knop |
| Reveal | Slot machine animatie die app's getal onthult |
| Verloren | "OUCH! JE HEBT KANS VERLOREN" + dare tekst + "OF" + straf |
| Veilig | "JE BENT VEILIG!" scherm (ontwerp nog te bepalen) |
| Instellingen | Taal, geluid, thema-filters (tags), over de app |

---

## Dare Bibliotheek

Dares zijn lokale JSON bestanden per thema. Elke dare heeft:
- `id` — unieke string
- `text` — de dare zelf
- `punishment` — de straf als de speler de dare weigert
- `tags` — categorisering (bijv. `alc`, `luidruchtig`, `geld`)

**Thema's (v1, allemaal gratis):**
- **Casual** — lichte, algemene dares
- **Crazy** — gekke/bizarre dares
- **Party** — feest-gerelateerde dares (alcohol, luidruchtig)

De app houdt bij welke dares al gebruikt zijn (`usedDareIds`) zodat er geen herhaling is. Pas als alle dares van een thema geweest zijn, wordt de pool gereset en opnieuw geshuffeld.

---

## Data Laag (Aanpak C)

De rest van de app communiceert uitsluitend via een `DareRepository` interface:

```
DareRepository (interface)
  getThemes() → Theme[]
  getDaresByTheme(themeId) → Dare[]
  getRandomDare(themeId, excludeIds) → Dare

LocalDareRepository (v1) → leest lokale JSON bestanden
RemoteDareRepository (v2, toekomst) → haalt dares op via API
```

Hierdoor kan de databron later worden gewisseld zonder UI-aanpassingen.

---

## Tech Stack

| Onderdeel | Keuze | Reden |
|-----------|-------|-------|
| Framework | React Native + Expo | iOS + Android, één codebase |
| Navigatie | Expo Router | File-based routing |
| Animaties | React Native Reanimated | Slot machine, splash reveal |
| State | Zustand | Lichtgewicht, geen boilerplate |
| Taal | TypeScript | Type-safe |
| Data | Lokale JSON | Geen backend nodig in v1 |

---

## Projectstructuur

```
whats-the-chance/
├── app/
│   ├── index.tsx           ← Home
│   ├── setup.tsx           ← Spelers toevoegen
│   ├── theme.tsx           ← Thema kiezen
│   ├── rules.tsx           ← Regels
│   ├── game/
│   │   ├── dare.tsx        ← Dare scherm
│   │   ├── input.tsx       ← Getal invoer (PvGame)
│   │   ├── reveal.tsx      ← Slot machine animatie
│   │   ├── result.tsx      ← Verloren scherm
│   │   └── safe.tsx        ← Veilig scherm
│   └── settings.tsx
├── components/
├── data/
│   ├── repository/
│   │   ├── DareRepository.ts
│   │   └── LocalDareRepository.ts
│   └── dares/
│       ├── casual.json
│       ├── crazy.json
│       └── party.json
└── store/
    └── gameStore.ts        ← Zustand spelsessie
```

---

## Spelsessie State

```typescript
{
  mode: 'pvp' | 'pvgame',
  players: { id: string, name: string }[],
  selectedTheme: string,
  usedDareIds: string[],
  currentPlayerIndex: number,
  currentDare: Dare | null
}
```

---

## Bewust buiten scope (v1)

- Online multiplayer (twee toestellen)
- Eigen dares aanmaken
- Punten bijhouden
- Premium/betaalmuur
- Advertenties
