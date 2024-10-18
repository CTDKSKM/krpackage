'use client';

import { useEffect, useState } from 'react';
import { SearchResult, Product } from '../types';
import { getProducts } from '@/utils/product';
import AddProductModal from '@/components/AddProductModal';
import LoadingOverlay from '@/components/LoadingOverlay';
import SearchResults from '@/components/SearchResults';
import SearchHistory from '@/components/SearchHistory';
import Toast from '@/components/Toast';
import dynamic from 'next/dynamic';

const SearchForm = dynamic(() => import('@/components/SearchForm'), {
  ssr: false,
});

function HomePage() {


    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult>({});
    const [notFoundModel, setNotFoundModel] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [searchHistory, setSearchHistory] = useState<Array<{modelName: string, boxType: string}>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setToastMessage('제품 목록을 가져오는데 실패했습니다.');
            setShowToast(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        const trimmedSearchTerm = searchTerm.trim();
        if (!trimmedSearchTerm) {
            setToastMessage('검색어를 입력해주세요.');
            setShowToast(true);
            return;
        }

        const foundProduct = products.find(p => p.modelName.toLowerCase() === trimmedSearchTerm.toLowerCase());
        if (foundProduct) {
            setSearchResults(prev => ({
                ...prev,
                [foundProduct.boxType]: (prev[foundProduct.boxType] || 0) + 1
            }));
            setSearchHistory(prev => [{ modelName: foundProduct.modelName, boxType: foundProduct.boxType }, ...prev]);
        } else {
            setNotFoundModel(trimmedSearchTerm);
            onOpen();
        }
        setSearchTerm('');
    };

    const removeSearchHistory = (index: number) => {
        setSearchHistory(prev => {
            const newHistory = [...prev];
            const removedItem = newHistory.splice(index, 1)[0];
            setSearchResults(prev => {
                const newResults = { ...prev };
                newResults[removedItem.boxType] = (newResults[removedItem.boxType] || 1) - 1;
                if (newResults[removedItem.boxType] <= 0) {
                    delete newResults[removedItem.boxType];
                }
                return newResults;
            });
            return newHistory;
        });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <SearchForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            <SearchResults searchResults={searchResults} />
            <SearchHistory 
                searchHistory={searchHistory} 
                onRemove={removeSearchHistory}
            />
            <AddProductModal
                isOpen={isOpen}
                onClose={onClose}
                modelName={notFoundModel}
                onProductAdded={fetchProducts}
            />
            {isLoading && <LoadingOverlay />}
            {showToast && (
                <Toast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}

export default HomePage;
