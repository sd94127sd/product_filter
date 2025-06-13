export interface Item {
    id: number;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
}

export interface FilterState {
    searchTerm: string;
    selectedCategories: string[];
    priceRange: {
        min: number;
        max: number;
    };
    showInStockOnly: boolean;
}

export interface SortOption {
    field: 'price' | 'name';
    direction: 'asc' | 'desc';
}

export interface UseProductsFilterReturn {
    filteredItems: Item[];
    totalItems: number;
    filters: FilterState;
    sortOption: SortOption;
    pageSize: number;
    availableCategories: string[];
    priceRange: { min: number; max: number };
    updateSearchTerm: (term: string) => void;
    toggleCategory: (category: string) => void;
    updatePriceRange: (min: number, max: number) => void;
    toggleInStockOnly: () => void;
    updateSort: (option: SortOption) => void;
    updatePageSize: (size: number) => void;
    resetFilters: () => void;
}