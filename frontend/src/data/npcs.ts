import type { NPC } from '../types';

export const NPCS: NPC[] = [
  { id: 'sarah', name: 'Sarah', role: 'Bác sĩ của Safe Haven', mapId: 'safe-haven', x: 5, y: 3, icon: '🧑‍⚕️' },
  { id: 'kai', name: 'Kai', role: 'Cựu nhân viên cứu hộ · 1,90 m', mapId: 'safe-haven', x: 8, y: 3, icon: '🧍‍♂️' },
  { id: 'mira', name: 'Mira', role: 'Người đưa tin', mapId: 'abandoned-town', x: 8, y: 3, icon: '🧑‍🔧' },
  { id: 'archivist', name: 'Người gác hồ sơ', role: 'Bệnh viện St. Oran', mapId: 'hospital', x: 8, y: 3, icon: '🧑‍⚕️' },
];
