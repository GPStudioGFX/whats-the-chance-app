# What's the Chance

## Wat is dit?

What's the Chance is een party game app gebaseerd op het populaire spel "Wat is de kans dat". Spelers krijgen een dare te zien. Eén speler stelt een kans voor (bijv. 1 op 10), beide partijen kiezen een getal — matchen ze? Dan moet de dare gedaan worden.

## Game Modi

### PvP (Speler vs Speler)
De app is een dare-deck. Spelers trekken random dares en wijzen zelf aan wie het doet. Het getallenspel doen ze mondeling. Tap "Volgende" voor de volgende dare.

### PvGame (Speler vs App)
De app kiest random welke speler de dare krijgt. Die speler vult een kans (1/X) en een getal in. De app genereert een random getal — match? Dare doen. Geen match? Veilig.

## Thema's

| Thema | Beschrijving |
|-------|-------------|
| Casual | Lichte, algemene dares voor iedereen |
| Crazy | Gekke en bizarre dares |
| Party | Feest-gerelateerde dares |

## Game Instellingen (voor elke sessie)

**Ter beschikking** — filtert dares op wat de groep beschikbaar heeft:
Alcohol · Geld · Buiten · Avond

**Spelsituatie** — vraagtypen:
- Normale vragen (v1)
- Groepsvragen (v2) — dare escaleert rond de tafel, kans daalt elke beurt
- Puntensysteem (v2) — iedereen start met 1000 punten

**Straf opties:**
- Kleine opdracht (v1) — alternatief als je de dare weigert
- Puntenverlies (v2)
- Slokken (v2)

## Tech Stack

- **Framework:** React Native + Expo (iOS & Android)
- **Navigatie:** Expo Router
- **Animaties:** React Native Reanimated
- **State:** Zustand
- **Taal:** TypeScript
- **Data:** Lokale JSON (v1)

## Status

In ontwikkeling — v1 is volledig gratis, geen backend.

## Roadmap (v2+)

- Groepsvragen mechanic
- Puntensysteem (1000 punten, aftellen bij weigering)
- Straf opties: puntenverlies en slokken
- Eigen dares aanmaken
- Online multiplayer
- Premium thema's
