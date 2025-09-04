import api from "@/services/api";

// payload: [{ quantity: number, productId: string }]
export async function createOrder(payload) {
  const response = await api.post("/v1/orders/create", payload);
  return response.data;
}


