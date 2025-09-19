'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAndStoreUserData } from '../services/setLocalStorage';
import { CircleUser } from 'lucide-react';
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartSheet from "@/components/CartSheet";

export function Header() {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Listener para scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = role === "ADMIN";
  const isProductor = role === "PRODUCTOR" || role === "ADMIN";

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
    <header className={`text-zinc-950 text-3xl drop-shadow-lg transition-all duration-300 ${
      isScrolled 
        ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'relative'
    }`}>
      <div className="flex align-center text-center m-4 justify-between items-center">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <Image
            src="/img/logo.svg"
            alt="BOA SAUDE"
            width={200}
            height={10}
            className="h-12 w-auto"
          />
        </div>

        <div className="flex gap-2 items-center">
          {/* Barra de Pesquisa - desativada */}
          {/**
           * <div className="relative">
           *   <input
           *     type="text"
           *     placeholder="Buscar produtos..."
           *     className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
           *   />
           *   <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500">
           *     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           *       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
           *     </svg>
           *   </button>
           * </div>
           */}

          {/* Botões visíveis para usuários com role específica */}
          {isAdmin && (
            <><Button className="bg-green-500">Meus Produtos</Button>
              <Button className="bg-green-500">Relatórios</Button>
            </>
          )}
          {isProductor && (
            <>
              <Button className="bg-green-500" onClick={() => router.push("/cadastro-produto")}>Cadastro de Produtos</Button>
              <Button className="bg-green-500" onClick={() => router.push("/meusProdutos")}>Meus Produtos</Button>
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
                {/* Mostrar "Cadastrar Loja" apenas para usuários com role USER */}
                {role === 'USER' && (
                  <DropdownMenuItem onClick={() => router.push("/cadastro-loja")}>
                    Cadastrar Loja
                  </DropdownMenuItem>
                )}
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

          {/* Carrinho sempre visível 
          <CartSheet />*/}
        </div>
      </div>
      <hr className="border-t-2 opacity-10 border-zinc-950 drop-shadow-4xl" />
    </header>
  );
}
export default Header;