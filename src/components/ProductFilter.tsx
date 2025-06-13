'use client'
import React from 'react';
import { FilterState, SortOption } from '@/lib/type';

interface ProductFilterProps {
    filters: FilterState;
    sortOption: SortOption;
    availableCategories: string[];
    priceRange: { min: number; max: number };
    pageSize: number;
    onSearchChange: (term: string) => void;
    onCategoryToggle: (category: string) => void;
    onPriceRangeChange: (min: number, max: number) => void;
    onStockToggle: () => void;
    onSortChange: (option: SortOption) => void;
    onPageSizeChange: (size: number) => void;
    onReset: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
    filters,
    sortOption,
    availableCategories,
    priceRange,
    pageSize,
    onSearchChange,
    onCategoryToggle,
    onPriceRangeChange,
    onStockToggle,
    onSortChange,
    onPageSizeChange,
    onReset
}) => {
    return (
        <div className="glass-strong rounded-2xl p-6 mb-8 slide-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-glass flex items-center gap-2">
                    🔍 智能篩選器
                </h2>
                <button
                    onClick={onReset}
                    className="cursor-pointer glass-button px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                    🔄 重置篩選
                </button>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Search Bar */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-glass">
                        商品名稱搜索
                    </label>
                    <input
                        type="text"
                        placeholder="輸入商品名稱..."
                        value={filters.searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                    />
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-glass">
                        類別篩選
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {availableCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => onCategoryToggle(category)}
                                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${filters.selectedCategories.includes(category)
                                        ? 'glass-badge text-white shadow-lg'
                                        : 'glass-light text-glass-light hover:glass-badge'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-glass">
                        價格範圍
                    </label>
                    <div className="flex gap-3 items-center">
                        <input
                            type="number"
                            placeholder="最低價"
                            value={filters.priceRange.min}
                            onChange={(e) => onPriceRangeChange(Number(e.target.value), filters.priceRange.max)}
                            className="glass-input flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none"
                        />
                        <span className="text-glass-light font-medium">-</span>
                        <input
                            type="number"
                            placeholder="最高價"
                            value={filters.priceRange.max}
                            min={filters.priceRange.min}
                            onChange={(e) => onPriceRangeChange(filters.priceRange.min, Number(e.target.value))}
                            className="glass-input flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none"
                        />
                    </div>
                    <div className="text-xs text-glass-light">
                        範圍: ${priceRange.min} - ${priceRange.max}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-4 border-t border-white/20">

                {/* Left */}
                <div className="flex flex-wrap gap-4 items-center">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={filters.showInStockOnly}
                            onChange={onStockToggle}
                            className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded mr-3 border-2 transition-all duration-300 flex items-center justify-center ${filters.showInStockOnly
                                ? 'bg-green-500 border-green-400'
                                : 'bg-white/10 border-white/30 group-hover:border-white/50'
                            }`}>
                            {filters.showInStockOnly && (
                                <span className="text-white text-xs">✓</span>
                            )}
                        </div>
                        <span className="text-sm text-glass group-hover:text-white transition-colors">
                            僅顯示有庫存
                        </span>
                    </label>

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-glass">排序:</label>
                        <select
                            value={`${sortOption.field}-${sortOption.direction}`}
                            onChange={(e) => {
                                const [field, direction] = e.target.value.split('-') as ['price' | 'name', 'asc' | 'desc'];
                                onSortChange({ field, direction });
                            }}
                            className="cursor-pointer glass-select px-3 py-2 rounded-lg text-sm focus:outline-none"
                        >
                            <option className="cursor-pointer" value="name-asc">名稱 A-Z</option>
                            <option className="cursor-pointer" value="name-desc">名稱 Z-A</option>
                            <option className="cursor-pointer" value="price-asc">價格 低-高</option>
                            <option className="cursor-pointer" value="price-desc">價格 高-低</option>
                        </select>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-glass">每頁:</label>
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="cursor-pointer glass-select px-3 py-2 rounded-lg text-sm focus:outline-none"
                        >
                            <option value={10}>10 件</option>
                            <option value={20}>20 件</option>
                            <option value={50}>50 件</option>
                            <option value={100}>100 件</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}; 