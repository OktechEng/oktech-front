'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cadastroProdutoSchema from "../model/schema";
import { useState } from "react";
import api from '../../../services/api';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export const useCadastroProduto = () => {
  const [cadastroError, setCadastroError] = useState("");
  const [cadastroSuccess, setCadastroSuccess] = useState("");
  const router = useRouter();
  
  // Usar o hook genérico de autenticação
  const { isAuthenticated, authError, isLoading, checkAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(cadastroProdutoSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      stock: 0,
      price:0,
      files: undefined
    },
  });

  if (!checkAuth()) {
    return {
    register: () => {},
    handleSubmit: () => {},
    onSubmit: () => {},
    errors: {},
    isSubmitting: false,
    cadastroError: "Usuário não autenticado.",
    cadastroSuccess: "",
    authError,
    isLoading,
    isAuthenticated,
    router
  };
  }

  const onSubmit = async (data) => {
    setCadastroError("");
    setCadastroSuccess("");

    // Verificar novamente se o token existe antes de fazer o cadastro
    if (!checkAuth()) {
      return;
    }

    
    const shop = await api.get('/v1/shops');
    const shopId = shop.data.id;
    

    try {
      const { files, ...productPayload } = data;
      const response = await api.post(`/v1/products/${shopId}`, productPayload);
      const productId = response?.data?.id;

      if (productId && files && files.length > 0) {
        const formData = new FormData();
        Array.from(files).slice(0, 5).forEach((file) => formData.append('files', file));
        formData.append('productId', productId);

        await api.post(`/api/product-images/upload-form`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setCadastroSuccess("Produto cadastrado com sucesso!");
    } catch (error) {
      setCadastroError("Erro ao cadastrar produto. Tente novamente.");
      console.error("Erro ao cadastrar produto:", error);
    } finally {
      reset();
    }
    };



  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    cadastroError,
    cadastroSuccess,
    authError,
    isLoading,
    isAuthenticated,
    router,
    setValue
  };
};
