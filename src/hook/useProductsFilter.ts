'use client'
import { useState, useMemo, useCallback, useEffect } from "react";
import { FilterState, SortOption, UseProductsFilterReturn } from "@/lib/type";
import { processItemsData, getAvailableCategories, getPriceRange } from "@/lib/data-utils";

const useDebounce = <T,>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

// localStorage 相關的工具函數
const STORAGE_KEYS = {
    PAGE_SIZE: 'product-filter-page-size'
} as const;

const getStoredPageSize = (): number => {
    if (typeof window === 'undefined') return 20; // SSR 安全檢查

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PAGE_SIZE);
        if (stored) {
            const parsed = parseInt(stored, 10);
            if (parsed >= 10 && parsed <= 100) {
                return parsed;
            }
        }
    } catch (error) {
        console.warn('無法讀取 localStorage 中的 pageSize 設定:', error);
    }
    
    return 20; // 預設值
};

const setStoredPageSize = (size: number): void => {
    if (typeof window === 'undefined') return; // SSR 安全檢查
    
    try {
        localStorage.setItem(STORAGE_KEYS.PAGE_SIZE, size.toString());
    } catch (error) {
        console.warn('無法儲存 pageSize 設定到 localStorage:', error);
    }
};

// 提取商品名稱中的數字用於排序
const extractNumber = (str: string): number => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

export const useProductsFilter = (): UseProductsFilterReturn => {
    const allItems = useMemo(() => processItemsData(), []);
    const availableCategories = useMemo(() => getAvailableCategories(allItems), [allItems]);
    const priceRange = useMemo(() => getPriceRange(allItems), [allItems]);

    const [filters, setFilters] = useState<FilterState>({
        searchTerm: '',
        selectedCategories: [],
        priceRange: { min: priceRange.min, max: priceRange.max },
        showInStockOnly: false
    });

    const [sortOption, setSortOption] = useState<SortOption>({
        field: 'name',
        direction: 'asc'
    });

    // 從 localStorage 讀取 pageSize，如果沒有則使用預設值 20
    const [pageSize, setPageSize] = useState<number>(() => getStoredPageSize());

    // 當 pageSize 改變時，同步儲存到 localStorage
    useEffect(() => {
        setStoredPageSize(pageSize);
    }, [pageSize]);

    // 使用防抖來優化搜索性能
    const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

    const filteredItems = useMemo(() => {
        const filtered = allItems.filter(item => {
            // 名稱搜索
            const matchesSearch = debouncedSearchTerm === '' || 
                item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

            // 類別篩選
            const matchesCategory = filters.selectedCategories.length === 0 ||
                filters.selectedCategories.includes(item.category);

            // 價格範圍篩選
            const matchesPrice = item.price >= filters.priceRange.min && 
                item.price <= filters.priceRange.max;

            // 庫存篩選
            const matchesStock = !filters.showInStockOnly || item.inStock;

            return matchesSearch && matchesCategory && matchesPrice && matchesStock;
        });

        // 排序 - 創建新數組來避免修改原始數組
        return [...filtered].sort((a, b) => {
            const { field, direction } = sortOption;
            let comparison = 0;

            if (field === 'price') {
                comparison = a.price - b.price;
            } else if (field === 'name') {
                const aNum = extractNumber(a.name);
                const bNum = extractNumber(b.name);
                comparison = aNum !== bNum ? aNum - bNum : a.name.localeCompare(b.name);
            }

            return direction === 'asc' ? comparison : -comparison;
        }).sort((a, b) => {
            if (debouncedSearchTerm) {
                const aExactMatch = a.name.toLowerCase() === debouncedSearchTerm.toLowerCase();
                const bExactMatch = b.name.toLowerCase() === debouncedSearchTerm.toLowerCase();
                
                if (aExactMatch && !bExactMatch) return -1;
                if (!aExactMatch && bExactMatch) return 1;
                
                // 優先顯示以搜索詞開頭的結果
                const aStartsWith = a.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase());
                const bStartsWith = b.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase());
                
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
            }
            
            return 0;
        });
    }, [allItems, debouncedSearchTerm, filters.selectedCategories, filters.priceRange, filters.showInStockOnly, sortOption]);

    const updateSearchTerm = useCallback((term: string) => {
        setFilters(prev => ({ ...prev, searchTerm: term }));
    }, []);

    const toggleCategory = useCallback((category: string) => {
        setFilters(prev => ({
            ...prev,
            selectedCategories: prev.selectedCategories.includes(category)
                ? prev.selectedCategories.filter(c => c !== category)
                : [...prev.selectedCategories, category]
        }));
    }, []);

    const updatePriceRange = useCallback((min: number, max: number) => {
        setFilters(prev => ({
            ...prev,
            priceRange: { min, max }
        }));
    }, []);

    const toggleInStockOnly = useCallback(() => {
        setFilters(prev => ({
            ...prev,
            showInStockOnly: !prev.showInStockOnly
        }));
    }, []);

    const updateSort = useCallback((option: SortOption) => {
        setSortOption(option);
    }, []);

    const updatePageSize = useCallback((size: number) => {
        // 驗證 pageSize 數值範圍
        const validSize = Math.max(10, Math.min(100, size));
        setPageSize(validSize);
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            searchTerm: '',
            selectedCategories: [],
            priceRange: { min: priceRange.min, max: priceRange.max },
            showInStockOnly: false
        });
        setSortOption({ field: 'name', direction: 'asc' });
        // 重置時不改變 pageSize，保持使用者偏好
        // setPageSize(20);
    }, [priceRange]);

    return {
        filteredItems,
        totalItems: filteredItems.length,
        filters,
        sortOption,
        pageSize,
        availableCategories,
        priceRange,
        updateSearchTerm,
        toggleCategory,
        updatePriceRange,
        toggleInStockOnly,
        updateSort,
        updatePageSize,
        resetFilters
    };
};

