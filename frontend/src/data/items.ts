import type { ItemDefinition } from '../types';

export const ITEMS: Record<string, ItemDefinition> = {
  water: { id: 'water', name: 'Water', icon: '💧', description: 'Nước uống còn niêm phong.', stackable: true },
  bread: { id: 'bread', name: 'Bread', icon: '🍞', description: 'Một ổ bánh đã hơi khô.', stackable: true },
  'old-key': { id: 'old-key', name: 'Old Key', icon: '🗝️', description: 'Chìa khóa mang ký hiệu Ward 0.', stackable: false },
};
