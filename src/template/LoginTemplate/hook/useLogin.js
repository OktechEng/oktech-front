'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../model/schema";
import api from '../../../services/api';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAndStoreUserData } from '../../../services/setLocalStorage';

// Hook customizado para login, já integrado ao React Hook Form e Zod
export const useLogin = () => {
    // Estado para mensagens de erro do usuário
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(""); // Novo estado para sucesso
    const router = useRouter();

    // Inicializa o React Hook Form com o schema do Zod
    const {
        register, // Função para registrar os inputs no formulário
        handleSubmit, // Função para lidar com o submit do formulário
        formState: { errors, isSubmitting }, // Estado do formulário: erros e loading
        reset, // Função para resetar o formulário, se necessário
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    // Função chamada ao submeter o formulário
    const onSubmit = async (data) => {
        setLoginError("");
        setLoginSuccess(""); // Limpa mensagens anteriores
        try {
            const response = await api.post('/v1/auth/login', data);
            console.log('Login response:', response);
            const { token } = response.data || {};

            if (token) {
                // Salve o token JWT no localStorage
                localStorage.setItem('jwtToken', token);
                
                // Buscar dados do usuário
                try {
                    await fetchAndStoreUserData("/v1/users");
                    const userData = localStorage.getItem('userData');
                    if (userData) {
                        const userInfo = JSON.parse(userData);  
                        // Salvar role separadamente para facilitar acesso
                        localStorage.setItem('role', userInfo.role);
                    }
                } catch (userError) {
                    console.error('Erro ao buscar dados do usuário:', userError);
                }
                
                setLoginSuccess("Login realizado com sucesso!"); // Mensagem de sucesso
                
                // Pequeno delay para mostrar o toast e depois redirecionar
                setTimeout(() => {
                    // Força reload da página para atualizar o header
                    window.location.href = "/";
                }, 1500);
            } else {
                setLoginError("Falha no login: token não encontrado. Verifique suas credenciais.");
                console.error('Token não encontrado na resposta da API.');
            }
        } catch (error) {
            // Trate erros de login aqui
            setLoginError("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
            console.error('Erro ao fazer login:', error);
        } finally {
            reset();
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        loginError,
        loginSuccess, // Retorne a mensagem de sucesso
    };
};
