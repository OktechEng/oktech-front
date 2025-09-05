'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { listProductsWithImages } from '@/services/products';

export default function ProdutosPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 12; // Produtos por página

  const fetchProducts = async (page = 0, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError('');

      const params = {
        page,
        size: pageSize
      };

      const response = await listProductsWithImages(params);
      console.log('Response from API:', response);
      
      if (append) {
        setProducts(prev => [...prev, ...(response.content || [])]);
      } else {
        setProducts(response.content || []);
      }
      
      setTotalPages(response.totalPages || 0);
      setHasMore(page < (response.totalPages || 1) - 1);
      setCurrentPage(page);
    } catch (err) {
      setError('Falha ao carregar produtos');
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loadingMore) {
      fetchProducts(currentPage + 1, true);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f0]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-orange-500 mb-2">
                Todos os Produtos
              </h1>
              <p className="text-gray-600">
                Descubra nossa seleção completa de produtos frescos
              </p>
            </div>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-50"
            >
              ← Voltar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {products.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-md transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Carregando...
                    </>
                  ) : (
                    'Carregar Mais Produtos'
                  )}
                </Button>
              </div>
            )}

            {/* Pagination Info */}
            <div className="text-center mt-6 text-gray-600">
              <p>
                Página {currentPage + 1} de {totalPages} • {products.length} produtos carregados
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
