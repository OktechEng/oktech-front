'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../model/schema";

// Hook customizado para login, já integrado ao React Hook Form e Zod
export const useLogin = () => {
    // Inicializa o React Hook Form com o schema do Zod
    const {
        register, // Função para registrar os inputs no formulário
        handleSubmit, // Função para lidar com o submit do formulário
        formState: { errors, isSubmitting }, // Estado do formulário: erros e loading
        reset, // Função para resetar o formulário, se necessário
    } = useForm({
        resolver: zodResolver(loginSchema), // Usa o schema do Zod para validação automática
        defaultValues: { email: "", password: "" }, // Valores iniciais dos campos
    });

    // Função chamada ao submeter o formulário
    const onSubmit = async (data) => {
        // Aqui você pode chamar sua API de login ou simular o login
        // Exemplo: await login(data);
        console.log(data);
        reset(); // Se quiser limpar o formulário após o login
    };

    // Retorna tudo que o componente precisa
    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    };
};