'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cadastroSchema from "../model/schema";
import { useState } from "react";
import api from '../../../services/api';
import { useRouter } from "next/navigation";
import { maskCPF, maskPhone, removeSpecialCharacters } from "@/lib/utils";

export const useCadastro = () => {
  const [cadastroError, setCadastroError] = useState("");
  const [cadastroSuccess, setCadastroSuccess] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
      cpf: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setCadastroError("");
    setCadastroSuccess("");

    const formattedData = {
      ...data,
      cpf: removeSpecialCharacters(data.cpf),
      phone: removeSpecialCharacters(data.phone),
    };

    try {
      const response = await api.post("/v1/auth/register", formattedData);
      console.log("Cadastro response:", response);
      setCadastroSuccess("Cadastro realizado com sucesso! Indo para a página de login.");
      
      // Pequeno delay para mostrar o toast e depois redirecionar
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setCadastroError("Erro ao realizar cadastro. Tente novamente.");
      console.error("Erro ao cadastrar:", error);
      // Não limpa os dados em caso de erro para permitir correção
    }
    // reset() agora é chamado apenas após sucesso, mantendo dados em caso de erro
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setValue("phone", maskPhone(value));
  };

  const handleCpfChange = (e) => {
    const { value } = e.target;
    setValue("cpf", maskCPF(value));
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    cadastroError,
    cadastroSuccess,
    router,
    handlePhoneChange,
    handleCpfChange,
  };
};
