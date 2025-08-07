# Sistema de Autenticação

Este sistema fornece uma solução genérica para verificar se o usuário está autenticado em diferentes telas da aplicação.

## Hook useAuth

O hook `useAuth` é a base do sistema de autenticação. Ele verifica automaticamente se existe um token JWT no localStorage.

### Parâmetros
- `redirectTo` (string, opcional): Rota para redirecionar se não estiver autenticado (padrão: "/login")
- `delay` (number, opcional): Tempo em ms antes do redirecionamento (padrão: 3000)

### Retorna
- `isAuthenticated` (boolean): Se o usuário está autenticado
- `authError` (string): Mensagem de erro de autenticação
- `isLoading` (boolean): Se está verificando autenticação
- `checkAuth` (function): Função para verificar autenticação manualmente
- `logout` (function): Função para fazer logout

### Exemplo de uso

```javascript
import { useAuth } from '@/hooks/useAuth';

export const useMinhaFuncionalidade = () => {
  const { isAuthenticated, authError, isLoading, checkAuth } = useAuth();
  
  // Sua lógica aqui
  // Só executar se isAuthenticated for true
};
```

## Componente ProtectedRoute

O componente `ProtectedRoute` é uma forma mais simples de proteger páginas inteiras.

### Props
- `children` (ReactNode): Conteúdo a ser renderizado se autenticado
- `redirectTo` (string, opcional): Rota para redirecionar (padrão: "/login")
- `delay` (number, opcional): Tempo antes do redirecionamento (padrão: 3000)

### Exemplo de uso

```javascript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function MinhaPagina() {
  return (
    <ProtectedRoute>
      <MeuConteudo />
    </ProtectedRoute>
  );
}
```

## Implementações Atuais

### 1. Cadastro de Loja (`/cadastro-loja`)
- Usa `useAuth` no hook `useCadastroLoja`
- Verifica autenticação antes de permitir cadastro
- Redireciona para login se não autenticado

### 2. Conta (`/conta`)
- Usa `useAuth` no hook `useDetalhesDaConta`
- Só busca dados do usuário se autenticado
- Redireciona para login se não autenticado

## Como Adicionar Autenticação em Novas Telas

### Opção 1: Usar o hook useAuth diretamente
```javascript
import { useAuth } from '@/hooks/useAuth';

export const useMinhaFuncionalidade = () => {
  const { isAuthenticated, authError, isLoading, checkAuth } = useAuth();
  
  // Sua lógica aqui
  const minhaFuncao = async () => {
    if (!checkAuth()) return;
    // resto da lógica
  };
  
  return { minhaFuncao, isAuthenticated, authError, isLoading };
};
```

### Opção 2: Usar o componente ProtectedRoute
```javascript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function MinhaPagina() {
  return (
    <ProtectedRoute>
      <MeuConteudo />
    </ProtectedRoute>
  );
}
```

## Funcionalidades

- ✅ Verificação automática de token JWT
- ✅ Mensagens de erro personalizadas
- ✅ Loading states durante verificação
- ✅ Redirecionamento automático
- ✅ Função de logout
- ✅ Reutilizável em qualquer tela
- ✅ Componente wrapper para páginas inteiras
