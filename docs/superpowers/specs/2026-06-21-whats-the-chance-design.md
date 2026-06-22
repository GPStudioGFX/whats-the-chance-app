# What's the Chance — Design Spec

**Datum:** 2026-06-21 (bijgewerkt 2026-06-22)
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
              │     ├── Game instellingen
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
                    ├── Game instellingen
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

## Game Instellingen Scherm

Scherm tussen thema-keuze en regels. Heeft drie secties met toggles.

### Ter beschikking (v1 — werkt, filtert dares op tags)
Wat heeft de groep beschikbaar? Dares met bijbehorende tags worden gefilterd als een toggle uit staat.

| Toggle | Tag op dare |
|--------|------------|
| Alcohol | `alc` |
| Geld uitgeven | `geld` |
| Buiten | `buiten` |
| Avond/nacht | `avond` |

Standaard staan alle toggles uit. Als een toggle aan staat, mogen dares met die tag verschijnen.

### Spelsituatie (v1 — UI aanwezig, alleen "normale vragen" actief)
| Toggle | Status | Beschrijving |
|--------|--------|-------------|
| Normale vragen | v1 ✓ altijd aan | Standaard dare-deck |
| Groepsvragen | v2 — uitgeschakeld | Escalerende groepsdare (zie hieronder) |
| Puntensysteem | v2 — uitgeschakeld | Spelers starten met 1000 punten, verliezen punten bij weigeren |

### Straf opties (v1 — UI aanwezig, alleen "kleine opdracht" actief)
| Toggle | Status | Beschrijving |
|--------|--------|-------------|
| Kleine opdracht | v1 ✓ | Alternatieve straf bij weigering van dare |
| Puntenverlies | v2 — uitgeschakeld | Verliest X punten in plaats van dare doen |
| Slokken | v2 — uitgeschakeld | Drinkt X slokken als alternatief |

---

## Groepsvragen Mechanic (v2)

Een dare die de hele groep doorloopt totdat iemand faalt.

**Verloop:**
1. App kiest een speler en toont een groepsdare
2. Die speler kiest een kans (bijv. 1 op 10) en vult een getal in
3. **Veilig** → dare gaat door naar de volgende speler
4. Volgende speler moet een kans kiezen die **minstens 1 stap lager** is (bijv. max 1 op 9), maar mag ook verder zakken (bijv. 1 op 6) voor meer durf
5. Dit herhaalt totdat iemand **faalt** — die persoon doet de dare
6. Als de kans 1 op 1 bereikt, verliest die speler automatisch

**Regel:** Elke ronde daalt de maximale kans met minimaal 1. Spelers mogen lager gaan maar niet hoger.

---

## Schermen

| Scherm | Beschrijving |
|--------|-------------|
| Splash | Woord-voor-woord reveal: "WHAT'S" → "THE" → "CHANCE", dan "LETS GO" |
| Home | Thema-carousel (horizontaal scrollen), PvP + PvGame knop, settings icon |
| Spelers toevoegen | Naam invoeren, speler toevoegen via + knop (alleen PvGame) |
| Thema kiezen | Cards met thema's (Casual, Crazy, Party), toggle aan/uit |
| Game instellingen | Ter beschikking + Spelsituatie + Straf toggles |
| Regels | Genummerde lijst (4 regels) op donkere achtergrond |
| Dare (PvP) | Dare tekst + "Volgende" knop |
| Dare + invoer (PvGame) | Naam van random gekozen speler + dare tekst + "1/X" veld + "Jouw getal" veld |
| Reveal | Slot machine animatie die app's getal onthult |
| Verloren | "OUCH! JE HEBT KANS VERLOREN" + dare tekst + "OF" + actieve straf-optie |
| Veilig | "JE BENT VEILIG!" scherm |
| App instellingen | Taal, geluid, over de app |

---

## Dare Bibliotheek

Dares zijn lokale JSON bestanden per thema. Elke dare heeft:
- `id` — unieke string
- `text` — de dare zelf
- `punishment` — de kleine opdracht als de speler de dare weigert
- `tags` — array met filters: `alc`, `geld`, `buiten`, `avond`
- `type` — `"normal"` of `"group"` (v2)

**Thema's (v1, allemaal gratis):**
- **Casual** — lichte, algemene dares
- **Crazy** — gekke/bizarre dares
- **Party** — feest-gerelateerde dares (alcohol, luidruchtig)

**Filtering:** Alleen dares worden getoond waarvan alle tags overeenkomen met actieve "ter beschikking" toggles. Dares zonder tags zijn altijd zichtbaar.

De app houdt bij welke dares al gebruikt zijn (`usedDareIds`) zodat er geen herhaling is. Pas als alle dares van een thema geweest zijn, wordt de pool gereset en opnieuw geshuffeld.

---

## Data Laag (Aanpak C)

```
DareRepository (interface)
  getThemes() → Theme[]
  getRandomDare(themeId, excludeIds, activeTags) → Dare

LocalDareRepository (v1) → leest lokale JSON bestanden
RemoteDareRepository (v2, toekomst) → haalt dares op via API
```

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

## Spelsessie State

```typescript
{
  mode: 'pvp' | 'pvgame',
  players: { id: string, name: string }[],
  selectedTheme: string,
  usedDareIds: string[],
  currentDare: Dare | null,

  // Game instellingen
  availableTags: string[],          // ter beschikking: ['alc', 'geld', ...]
  activeGameModes: {
    normalDares: boolean,           // altijd true in v1
    groupDares: boolean,            // v2
    pointSystem: boolean,           // v2
  },
  activePunishments: {
    smallTask: boolean,             // altijd true in v1
    pointLoss: boolean,             // v2
    drinks: boolean,                // v2
  },
}
```

---

## Bewust buiten scope (v1)

- Online multiplayer (twee toestellen)
- Eigen dares aanmaken
- Groepsvragen mechanic
- Puntensysteem (spelers starten met 1000 punten)
- Straf-opties: puntenverlies en slokken
- Premium/betaalmuur
- Advertenties
