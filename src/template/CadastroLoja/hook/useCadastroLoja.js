'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cadastroLojaSchema from "../model/schema";
import { useState } from "react";
import api from '../../../services/api';
import { useRouter } from "next/navigation";
import { maskCNPJ, removeSpecialCharacters } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

export const useCadastroLoja = () => {
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
    resolver: zodResolver(cadastroLojaSchema),
    defaultValues: {
      name: "",
      description: "",
      cnpj: "",
    },
  });

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
  };

  const onSubmit = async (data) => {
    // Verificar novamente se o token existe antes de fazer o cadastro
    if (!checkAuth()) {
      const errorMsg = "Você precisa estar logado para cadastrar a loja.";
      toast.error(errorMsg);
      return;
    }

    const formattedData = {
      ...data,
      cnpj: removeSpecialCharacters(data.cnpj),
    };

    try {
      const response = await api.post("/v1/shops", formattedData);
      console.log("Cadastro de loja response:", response);
      
      const successMsg = "Loja cadastrada com sucesso! Faça login novamente para atualizar o sistema com as novas funcionalidades.";
      toast.success(successMsg, {
        autoClose: 3000,
        toastId: "cadastroLojaSuccess"
      });
      
      // Aguardar um pouco para mostrar a mensagem de sucesso
      setTimeout(() => {
        logout(); // Deslogar o usuário
        router.push("/login"); // Redirecionar para login
      }, 3000);
      
      // Limpar formulário apenas em caso de sucesso
      reset();
    } catch (error) {
      const errorMsg = "Erro ao cadastrar loja. Tente novamente.";
      toast.error(errorMsg);
      console.error("Erro ao cadastrar loja:", error);
      // NÃO fazer reset() aqui para manter os dados do formulário
    }
  };

  const handleCnpjChange = (e) => {
    const maskedValue = maskCNPJ(e.target.value);
    setValue("cnpj", maskedValue);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    authError,
    isLoading,
    isAuthenticated,
    router,
    handleCnpjChange,
  };
};
