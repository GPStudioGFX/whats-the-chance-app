import { Dare, DareRepository, Theme } from './DareRepository';
import casualDares from '../dares/casual.json';
import crazyDares from '../dares/crazy.json';
import partyDares from '../dares/party.json';

const THEMES: Theme[] = [
  { id: 'casual', name: 'Casual', isPremium: false, dares: casualDares as Dare[] },
  { id: 'crazy', name: 'Crazy', isPremium: false, dares: crazyDares as Dare[] },
  { id: 'party', name: 'Party', isPremium: false, dares: partyDares as Dare[] },
];

export class LocalDareRepository implements DareRepository {
  getThemes(): Theme[] {
    return THEMES;
  }

  getRandomDare(themeIds: string[], excludeIds: string[], activeTags: string[]): Dare | null {
    const selectedThemes = THEMES.filter((t) => themeIds.includes(t.id));

    const allDares = selectedThemes.flatMap((t) => t.dares);

    const visible = allDares.filter((dare) => {
      if (dare.type !== 'normal') return false;
      if (dare.tags.length === 0) return true;
      return dare.tags.every((tag) => activeTags.includes(tag));
    });

    const available = visible.filter((dare) => !excludeIds.includes(dare.id));

    // Reset pool als alles al gezien is
    const pool = available.length > 0 ? available : visible;

    if (pool.length === 0) return null;

    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
  }
}
