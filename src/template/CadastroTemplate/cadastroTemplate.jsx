'use client'

import { useCadastro } from "./hook/useCadastro";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function CadastroTemplate() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    cadastroError,
    cadastroSuccess,
    router,
    handleCpfChange,
    handlePhoneChange,
  } = useCadastro();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Exibe o toast quando houver erro de cadastro
  useEffect(() => {
    if (cadastroError) {
      toast.error(cadastroError, { toastId: "cadastroError" });
    }
  }, [cadastroError]);

  // Exibe o toast quando houver sucesso no cadastro
  useEffect(() => {
    if (cadastroSuccess) {
      toast.success(cadastroSuccess, { toastId: "cadastroSuccess" });
    }
  }, [cadastroSuccess]);

  return (
    <div className="min-h-screen px-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center my-6">Cadastro</h1>
      <div className="flex justify-center">
        <hr className="border-4 rounded-3xl w-2/6 border-orange-400" />
      </div>    
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Nome */}
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input placeholder="Nome" id="name" type="text" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* E-mail */}
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input placeholder="Email" id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Confirmar E-mail */}
          <div>
            <Label htmlFor="confirmEmail">Confirmar E-mail</Label>
            <Input placeholder="Confirme seu email" id="confirmEmail" type="email" {...register("confirmEmail")} />
            {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail.message}</p>}
          </div>

          {/* CPF */}
          <div>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              placeholder="CPF"
              id="cpf"
              type="text"
              {...register("cpf")}
              maxLength={14}
              onChange={handleCpfChange}
            />
            {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
          </div>

          {/* Telefone */}
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              placeholder="Telefone"
              id="phone"
              type="tel"
              {...register("phone")}
              maxLength={15}
              onChange={handlePhoneChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Senha */}
          <div>
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input placeholder="Senha" id="password" type={showPassword ? "text" : "password"} {...register("password")} />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirmar Senha */}
          <div>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Input placeholder="Confirme sua senha" id="confirmPassword" type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-500">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Botão */}
          <Button type="submit" disabled={isSubmitting} className="w-full bg-green-500 hover:bg-green-400">
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Ja tem uma conta?{" "}
          <a onClick={() => router.push("/login")} className="text-blue-500 hover:underline cursor-pointer">Faça login</a>
        </p>
      </div>
    </div>
  );
}
