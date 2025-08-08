'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cadastroLojaSchema from "../model/schema";
import { useState } from "react";
import api from '../../../services/api';
import { useRouter } from "next/navigation";
import { maskCNPJ, removeSpecialCharacters } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export const useCadastroLoja = () => {
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
    resolver: zodResolver(cadastroLojaSchema),
    defaultValues: {
      name: "",
      description: "",
      cnpj: "",
    },
  });

  // Não retornar cedo no hook para evitar undefined em SSR/prerender
  // O template já controla renderização com isLoading/isAuthenticated

  const onSubmit = async (data) => {
    setCadastroError("");
    setCadastroSuccess("");

    // Verificar novamente se o token existe antes de fazer o cadastro
    if (!checkAuth()) {
      setCadastroError("Você precisa estar logado para cadastrar a loja.");
      return;
    }

    const formattedData = {
      ...data,
      cnpj: removeSpecialCharacters(data.cnpj),
    };

    try {
      const response = await api.post("/v1/shops/create", formattedData);
      console.log("Cadastro de loja response:", response);
      setCadastroSuccess("Loja cadastrada com sucesso!");
      router.push("/login");
    } catch (error) {
      setCadastroError("Erro ao cadastrar loja. Tente novamente.");
      console.error("Erro ao cadastrar loja:", error);
    } finally {
      reset();
    }
  };

  const handleCnpjChange = (e) => {
    const { value } = e.target;
    setValue("cnpj", maskCNPJ(value));
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
    handleCnpjChange,
  };
};
