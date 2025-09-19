'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PRODUCT_CONSTANTS } from './model/schema';
import { useEdicaoProduto } from './hook/useEdicaoProduto';

export default function EdicaoProdutoTemplate() {
  const router = useRouter();
  const { 
    productId, 
    productData, 
    loading, 
    error, 
    successMessage, 
    setSuccessMessage, 
    setError, 
    handleUpdateProduct 
  } = useEdicaoProduto();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset, 
    setValue 
  } = useForm({
    resolver: zodResolver(PRODUCT_CONSTANTS.PRODUCT_FORM_SCHEMA),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      stock: 0,
      price: 0,
    },
  });

  // Este useEffect preenche o formulário com os dados do produto
  useEffect(() => {
    if (productData) {
      setValue('name', productData.name);
      setValue('description', productData.description);
      setValue('category', productData.category);
      setValue('stock', productData.stock);
      setValue('price', productData.price);
    }
  }, [productData, setValue]); // Removidas dependências desnecessárias

  // --- NOVO useEffect PARA REDIRECIONAMENTO ---
  // Este useEffect observa a 'successMessage'. Quando ela tiver um valor,
  // ele aciona o redirecionamento.
  useEffect(() => {
    if (successMessage) {
      // Opcional: Você pode mostrar a mensagem por um instante antes de redirecionar.
      // Adicionando um pequeno delay para o usuário ver a confirmação.
      const timer = setTimeout(() => {
        router.push('/meusProdutos');
      }, 1500); // Redireciona após 1.5 segundos

      // Boa prática: Limpa o timer se o componente for desmontado
      return () => clearTimeout(timer);
    }
  }, [successMessage, router]); // Dependências: a função só executa se estas mudarem

  const onSubmit = async (data) => {
    // A função handleUpdateProduct agora precisa retornar um booleano de sucesso
    // para sabermos se devemos prosseguir. Vamos ajustar o hook.
    const isSuccess = await handleUpdateProduct(data);
    // O redirecionamento agora é tratado pelo useEffect acima.
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-800">
              {productId ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>
            {/* Botão de Voltar para a lista de produtos */}
            <button
              onClick={() => router.push('/meus-produtos')}
              className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Voltar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Mensagens de erro/sucesso */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">✕</button>

          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {/* Mensagem de sucesso melhorada */}
            <span>{successMessage} Redirecionando para a lista de produtos...</span>
          </div>
        )}

        {/* Formulário de Edição */}
        <div className="bg-white rounded-xl shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {productId ? 'Detalhes do Produto' : 'Cadastrar Novo Produto'}
          </h2>
          
          {loading && !productData ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600">Carregando produto...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campos do formulário (sem alterações) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Produto *</label>
                <input type="text" required {...register('name')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço (R$) *</label>
                <input type="number" step="0.01" required {...register('price', { valueAsNumber: true })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                <input type="text" required {...register('category')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estoque</label>
                <input type="number" min="0" {...register('stock', { valueAsNumber: true })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <textarea rows="3" {...register('description')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>

              {/* Botões de ação */}
              <div className="md:col-span-2 flex flex-wrap gap-4 pt-4 border-t border-gray-200 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
                >
                  {isSubmitting || loading ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Salvando...</>
                  ) : 'Atualizar Produto'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/meus-produtos')} // Rota corrigida
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm mt-12">
        © 2025 Boa Saúde - Todos os direitos reservados.
      </footer>
    </div>
  );
}
