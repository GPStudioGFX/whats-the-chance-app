# Projectregels

Regels voor iedereen die aan dit project werkt — mens of AI.

---

## Verplicht bij elke wijziging

1. **Commit naar GitHub** — elke betekenisvolle wijziging wordt gecommit en gepusht naar de `main` branch. Geen lokale wijzigingen laten hangen.

2. **Update de changelog** — voeg elke nieuwe feature, fix of grote wijziging toe aan `changelog.md` onder de juiste versie/sectie. Gebruik de categorieën: `Toegevoegd`, `Gewijzigd`, `Verwijderd`, `Opgelost`.

3. **Update projectdocumentatie** — als een feature, scherm of mechaniek verandert, wordt `project.md` bijgewerkt zodat het altijd de huidige staat van de app beschrijft.

4. **Update de design spec** — als een ontwerpbeslissing verandert, wordt `docs/superpowers/specs/2026-06-21-whats-the-chance-design.md` bijgewerkt.

---

## Code & kwaliteit

5. **TypeScript verplicht** — geen `any` types zonder goede reden.

6. **Dares via DareRepository** — nooit direct JSON importeren in schermen of componenten. Altijd via de repository-interface.

7. **Geen duplicate dares in een sessie** — de dare-selectie logica respecteert `usedDareIds` en reset pas als alle dares geweest zijn.

---

## Scope

8. **Geen scope creep** — features die buiten v1 vallen (online multiplayer, eigen dares, premium, punten) worden niet gebouwd tenzij bewust besloten en gedocumenteerd.

9. **v1 is gratis** — geen betaalmuur, geen advertenties, geen analytics in v1.
