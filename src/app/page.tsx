'use client'
import React from 'react';
import { useProductsFilter } from '@/hook/useProductsFilter';
import { ProductFilter, ProductList } from '@/components';

export default function Home() {
    const {
        filteredItems,
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
    } = useProductsFilter();

    return (
        <div className="min-h-screen p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Filter Section */}
                <ProductFilter
                    filters={filters}
                    sortOption={sortOption}
                    availableCategories={availableCategories}
                    priceRange={priceRange}
                    pageSize={pageSize}
                    onSearchChange={updateSearchTerm}
                    onCategoryToggle={toggleCategory}
                    onPriceRangeChange={updatePriceRange}
                    onStockToggle={toggleInStockOnly}
                    onSortChange={updateSort}
                    onPageSizeChange={updatePageSize}
                    onReset={resetFilters}
                />

                <ProductList 
                    items={filteredItems} 
                    pageSize={pageSize}
                />
            </div>
        </div>
    );
}
