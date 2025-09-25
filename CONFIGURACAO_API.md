# Configuração da API

## Problema Identificado
O erro nas imagens dos produtos estava ocorrendo porque:

1. A variável de ambiente `NEXT_PUBLIC_API_URL` não estava configurada
2. A função `resolveImageUrl` não estava tratando adequadamente os casos sem imagem
3. Não havia tratamento de erro para falhas no carregamento das imagens

## Soluções Implementadas

### 1. Melhorias no ProductCard.jsx
- Adicionado logs detalhados para debug
- Melhorado o tratamento de URLs de imagem
- Adicionado fallback para imagem padrão
- Implementado tratamento de erro com estado local

### 2. Melhorias no MeusProdutosTemplate.jsx
- Atualizado para usar a tag `Image` do Next.js
- Implementado carregamento de imagens do backend
- Adicionado tratamento de erro por produto
- Integrado com a mesma lógica de resolução de URL do ProductCard

### 3. Atualizações no Hook useProdutos.js
- Modificado `buscarProdutos()` para carregar imagens junto com os produtos
- Atualizado `uploadImagemProduto()` para recarregar imagens após upload
- Implementado carregamento assíncrono de imagens para cada produto

### 4. Melhorias no Schema Product.js
- Adicionado método `resolveImageUrl()` na classe Product
- Atualizado `getPrimaryImage()` para usar a nova lógica de resolução
- Logs detalhados para debug de URLs de imagem

### 5. Configuração do Next.js
- Atualizado `next.config.mjs` para permitir imagens do backend
- Adicionado suporte para pathname `/uploads/**`
- Configurado para aceitar imagens HTTPS

### 6. Melhorias no EdicaoProdutoTemplate.jsx
- Adicionado campo de upload de imagem no formulário de edição
- Implementado preview da imagem selecionada
- Integrado upload de imagem com atualização do produto
- Exibição da imagem atual do produto

### 7. Atualizações no Hook useEdicaoProduto.js
- Modificado `handleUpdateProduct()` para aceitar arquivo de imagem
- Integrado com `uploadImagemProduto()` do hook useProdutos
- Tratamento de erro específico para upload de imagem

### 8. Tratamento de Erros
- Implementado `onError` handler na tag Image
- Adicionado estado `imageError` para controlar fallbacks
- Logs detalhados para debug

## Como Configurar

### 1. Criar arquivo .env.local
Crie um arquivo `.env.local` na raiz do projeto com:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 2. Para Produção
Substitua pela URL do seu servidor:

```bash
NEXT_PUBLIC_API_URL=https://seu-servidor.com
```

### 3. Reiniciar o Servidor
Após criar o arquivo `.env.local`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Estrutura de Dados Esperada

A API deve retornar os produtos com a seguinte estrutura:

```json
{
  "id": "product-id",
  "name": "Nome do Produto",
  "price": 10.50,
  "images": [
    {
      "id": "image-id",
      "imageUrl": "uploads/images/filename.png",
      "productId": "product-id"
    }
  ]
}
```

### Casos Tratados:
- **Com imagem**: `images: [{ imageUrl: "uploads/images/file.png" }]`
- **Sem imagem**: `images: []`
- **Imagem inválida**: Fallback para `/img/produto-default.png`

## Debug
Os logs no console mostrarão:
- URL sendo resolvida
- Se há imagens disponíveis
- URL final da imagem
- Erros de carregamento
