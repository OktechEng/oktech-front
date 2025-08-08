import api from "@/services/api";

export async function listProducts(params = {}) {
  const response = await api.get("/v1/products/get", { params });
  return response.data;
}


