'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import cadastroSchema from "../model/schema";
import { useState } from "react";
import api from '../../../services/api';
import { useRouter } from "next/navigation";

export const useCadastro = () => {
  const [cadastroError, setCadastroError] = useState("");
  const [cadastroSuccess, setCadastroSuccess] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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

    try {
      const response = await api.post("/v1/auth/register", data);
      console.log("Cadastro response:", response);
      setCadastroSuccess("Cadastro realizado com sucesso!");
      router.push("/login");
    } catch (error) {
      setCadastroError("Erro ao realizar cadastro. Tente novamente.");
      console.error("Erro ao cadastrar:", error);
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
    router,
  };
};
