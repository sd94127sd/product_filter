'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { Item } from '@/lib/type';

interface ProductListProps {
    items: Item[];
    pageSize: number;
}

export const ProductList: React.FC<ProductListProps> = ({ items, pageSize }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // 當項目變化時重置到第一頁
    useEffect(() => {
        setCurrentPage(1);
    }, [items.length, pageSize]);

    const totalPages = Math.ceil(items.length / pageSize);
    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return items.slice(startIndex, startIndex + pageSize);
    }, [items, currentPage, pageSize]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 7;

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    if (items.length === 0) {
        return (
            <div className="glass-container rounded-2xl p-12 text-center fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-xl text-glass mb-2">沒有找到符合條件的商品</div>
                <div className="text-glass-light">請嘗試調整篩選條件</div>
            </div>
        );
    }

    return (
        <div className="glass-container rounded-2xl overflow-hidden slide-up">
            {/* Desktop Table View */}
            <div className="hidden md:block">
                <div className="glass-table-header">
                    <div className="grid grid-cols-4 px-6 py-4">
                        <div className="text-sm font-semibold text-glass">商品名稱</div>
                        <div className="text-sm font-semibold text-glass">類別</div>
                        <div className="text-sm font-semibold text-glass">價格</div>
                        <div className="text-sm font-semibold text-glass">庫存狀態</div>
                    </div>
                </div>
                <div className="divide-y divide-white/10">
                    {paginatedItems.map((item) => (
                        <div key={item.id} className="glass-table-row grid grid-cols-4 px-6 py-4 transition-all duration-300">
                            <div className="text-glass font-medium">
                                {item.name}
                            </div>
                            <div>
                                <span className="glass-badge px-3 py-1 rounded-full text-xs font-semibold text-white">
                                    {item.category}
                                </span>
                            </div>
                            <div className=" font-bold">
                                ${item.price.toLocaleString()}
                            </div>
                            <div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.inStock
                                        ? 'glass-badge-green text-white'
                                        : 'glass-badge-red text-white'
                                    }`}>
                                    {item.inStock ? '有庫存' : '缺貨'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Card View - Max 2 per row */}
            <div className="md:hidden p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paginatedItems.map((item) => (
                        <div key={item.id} className="glass-card rounded-xl p-4">
                            <div className="space-y-3">
                                <div className="font-bold text-glass line-clamp-2">
                                    {item.name}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-glass-light">類別</span>
                                    <span className="glass-badge px-3 py-1 rounded-full text-xs font-semibold text-white">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-glass-light">價格</span>
                                    <span className="font-bold ">
                                        ${item.price.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-glass-light">庫存</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.inStock
                                            ? 'glass-badge-green text-white'
                                            : 'glass-badge-red text-white'
                                        }`}>
                                        {item.inStock ? '有庫存' : '缺貨'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="glass-pagination px-6 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-glass-light">
                            顯示 {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, items.length)} 筆，
                            共 {items.length} 筆商品
                        </div>
                        
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="glass-page-button px-3 py-2 text-sm font-medium rounded-md"
                            >
                                上一頁
                            </button>
                            
                            {getPageNumbers().map((page, index) => (
                                <React.Fragment key={index}>
                                    {page === '...' ? (
                                        <span className="px-3 py-2 text-sm text-glass-light">...</span>
                                    ) : (
                                        <button
                                            onClick={() => handlePageChange(page as number)}
                                            className={`glass-page-button px-3 py-2 text-sm font-medium rounded-md ${
                                                currentPage === page ? 'active' : ''
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </React.Fragment>
                            ))}
                            
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="glass-page-button px-3 py-2 text-sm font-medium rounded-md"
                            >
                                下一頁
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 