import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getProductsAxios = async () => {
    const response = await apiClient.get("/products");
    return response.data;
}

export const getProductDetailsAxios = async (id: number) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
}

export const createProductAxios = async (product : any ) =>{
    const response =  await apiClient.post(`/products`, product);
    return response.data;
}

export const deleteProduct = async (id: number) => {
   await apiClient.delete(`/products/${id}`)
}