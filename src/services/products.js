import api from "@/services/api";

export async function listProducts(params = {}) {
  try {
    const response = await api.get("/v1/products", { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error.response) {
      // Server responded with error status
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    } else if (error.request) {
      // Network error
      throw new Error('Network Error: Unable to connect to the server. Please check your internet connection.');
    } else {
      // Other error
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}

export async function getProductById(productId) {
  try {
    const response = await api.get(`/v1/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Product not found'}`);
    } else if (error.request) {
      throw new Error('Network Error: Unable to connect to the server.');
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}

export async function getProductImages(productId) {
  try {
    const response = await api.get(`/api/product-images/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching images for product ${productId}:`, error);
    // Return empty array if images can't be fetched
    return [];
  }
}

export async function getProductWithImages(productId) {
  try {
    const product = await getProductById(productId);
    const images = await getProductImages(productId);
    return { ...product, images };
  } catch (error) {
    console.error(`Failed to fetch product ${productId} with images:`, error);
    throw error;
  }
}

export async function listProductsWithImages(params = {}) {
  try {
    const productsResponse = await listProducts(params);
    const products = Array.isArray(productsResponse?.content) ? productsResponse.content : [];

    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        try {
          const images = await getProductImages(product.id);
          return { ...product, images };
        } catch (imageError) {
          console.warn(`Failed to fetch images for product ${product.id}:`, imageError);
          return { ...product, images: [] };
        }
      })
    );
    console.log("Products with images:", productsWithImages);
    
    // Retorna a estrutura completa da resposta paginada
    return {
      ...productsResponse,
      content: productsWithImages
    };
  } catch (error) {
    console.error("Failed to fetch products with images:", error);
    throw error;
  }
}


