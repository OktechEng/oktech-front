'use client'

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "./hook/useLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LoginTemplate() {
    const { register, handleSubmit, errors, isSubmitting, onSubmit, loginError, loginSuccess } = useLogin();

    // Exibe o toast quando houver erro de login
    useEffect(() => {
        if (loginError) {
            toast.error(loginError, { toastId: "loginError" });
        }
    }, [loginError]);

    // Exibe o toast quando houver sucesso no login
    useEffect(() => {
        if (loginSuccess) {
            toast.success(loginSuccess, { toastId: "loginSuccess" });
        }
    }, [loginSuccess]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <ToastContainer />
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
                {/* handleSubmit faz a validação automática antes de chamar onSubmit */}
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            type="email"
                            id="email"
                            {...register("email")}
                            required
                            className="mt-1"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            type="password"
                            id="password"
                            {...register("password")}
                            required
                            className="mt-1"
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Entrando..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}