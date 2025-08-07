'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAndStoreUserData } from '../services/setLocalStorage';
import { CircleUser } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  // Função para verificar autenticação
  const checkAuthentication = async () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      setIsAuthenticated(true);
      
      try {
        // Tentar buscar dados do usuário se não existirem
        let userData = localStorage.getItem('userData');
        if (!userData) {
          await fetchAndStoreUserData("/v1/users");
          userData = localStorage.getItem('userData');
        }
        
        if (userData) {
          const userInfo = JSON.parse(userData);
          setUserName(userInfo.name || '');
          setRole(userInfo.role || '');
          localStorage.setItem('role', userInfo.role || '');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    } else {
      setIsAuthenticated(false);
      setRole(null);
      setUserName('');
    }
  };

  useEffect(() => {
    checkAuthentication();
    
    // Listener para mudanças no localStorage (quando outro componente salva o token)
    const handleStorageChange = (e) => {
      if (e.key === 'jwtToken' || e.key === 'userData') {
        checkAuthentication();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Verificar periodicamente se há mudanças (fallback)
    const interval = setInterval(checkAuthentication, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const isAdmin = role === "USER" || role === "productor";
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setRole(null);
    setUserName('');
    router.push('/');
  };

  return (
    <header className="text-zinc-950 text-3xl drop-shadow-lg">
      <div className="flex align-center text-center m-4 justify-between items-center">
        <p onClick={() => router.push("/")} className="cursor-pointer">
          <span className="text-green-500">BOA</span>SAUDE
        </p>

        <div className="flex gap-2 items-center">
          {/* Botões visíveis para usuários com role específica */}
          {isAdmin && (
            <><Button className="bg-green-500">Meus Produtos</Button>
              <Button className="bg-green-500" onClick={() => router.push("/cadastro-produto")}>Cadastro de Produtos</Button>
              <Button className="bg-green-500">Relatórios</Button>
            </>
          )}

          {/* Se usuário está autenticado, mostra dropdown do perfil */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CircleUser 
                  className="h-8 w-8 text-green-500 cursor-pointer hover:scale-105 transition-transform" 
                />
                <span className="sr-only">Menu do usuário</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/conta")}>
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Se não está autenticado, mostra botões de login/cadastro */
            <>
              <Button className="bg-green-500 cursor-pointer" onClick={() => router.push("/login")}>Login</Button>
              <Button className="bg-white text-zinc-950 cursor-pointer" onClick={() => router.push("/cadastro")}>Cadastro</Button>
            </>
          )}
        </div>
      </div>
      <hr className="border-t-2 opacity-10 border-zinc-950 drop-shadow-4xl" />
    </header>
  );
}
export default Header;