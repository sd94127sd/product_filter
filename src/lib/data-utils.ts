import { Item } from './type';
import itemsData from '@/data/items.json';

// 為數據添加id字段
export const processItemsData = (): Item[] => {
    return (itemsData as Omit<Item, 'id'>[]).map((item, index) => ({
        ...item,
        id: index + 1
    }));
};

// 獲取所有可用類別
export const getAvailableCategories = (items: Item[]): string[] => {
    return Array.from(new Set(items.map(item => item.category))).sort();
};

// 獲取價格範圍
export const getPriceRange = (items: Item[]): { min: number; max: number } => {
    const prices = items.map(item => item.price);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices)
    };
}; 