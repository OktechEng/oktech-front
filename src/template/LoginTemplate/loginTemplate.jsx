'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "./hook/useLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export function LoginTemplate() {
    const { register, handleSubmit, errors, isSubmitting, onSubmit, loginError, loginSuccess, router } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="min-h-screen px-4">
            <ToastContainer />
            <h1 className="text-2xl font-bold text-center my-6">Login</h1>
            <div className="flex justify-center">
                <hr className="border-4 rounded-3xl w-2/6 border-orange-400" />
            </div>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
                {/* handleSubmit faz a validação automática antes de chamar onSubmit */}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            placeholder="Email"
                            type="email"
                            id="email"
                            {...register("email")}
                            required
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                            <Input
                                placeholder="Senha"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("password")}
                                required
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 cursor-pointer">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>
                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-400" disabled={isSubmitting}>
                        {isSubmitting ? "Entrando..." : "Login"}
                    </Button>
                </form>
                <p className="text-center text-sm mt-4">
                    Não tem uma conta?{" "}
                    <a onClick={() => router.push("/cadastro")} className="text-blue-500 hover:underline cursor-pointer">Cadastre-se agora</a>
                </p>
            </div>
        </div>
    );
}