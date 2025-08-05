'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAndStoreUserData } from '../services/setLocalStorage';

export function Header() {
const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Função assíncrona interna
    async function fetchUserAndSetRole() {
      await fetchAndStoreUserData("/v1/users");

      const storedRole = localStorage.getItem("role");
      if (storedRole) setRole(storedRole);
    }

    fetchUserAndSetRole();
  }, []);

  const isAdmin = role === "user" || role === "productor";
  return (
    <header className="text-zinc-950 text-3xl drop-shadow-lg">
      <div className="flex align-center text-center m-4 justify-between items-center">
        <p onClick={() => router.push("/")} className="cursor-pointer">
          <span className="text-green-500">BOA</span>SAUDE
        </p>

        <div className="flex gap-2">
          {/* Botões visíveis para usuários com role específica */}
          {isAdmin && (
            <>
              <Button className="bg-green-500">Meus Produtos</Button>
              <Button className="bg-green-500">Relatórios</Button>
            </>
          )}

          {/* Botões visíveis para todos */}
          <Button className="bg-green-500 cursor-pointer" onClick={() => router.push("/login")}>Login</Button>
          <Button className="bg-white text-zinc-950 cursor-pointer" onClick={() => router.push("/cadastro")}>Cadastro</Button>
        </div>
      </div>
      <hr className="border-t-2 opacity-10 border-zinc-950 drop-shadow-4xl" />
    </header>
  );
}
export default Header;