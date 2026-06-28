import axios from "axios"

export const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Перехоплювач запитів
apiClient.interceptors.request.use((config) => {
  console.log(`${config.method} ${config.url} Axios request`)
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Перехоплювач для відповідей
apiClient.interceptors.response.use((respose) => {
  console.log(`Успішна відповідь від ${respose.config.url}`)
  return respose
})

export const getProductsAxios = async () => {
  const response = await apiClient.get("/products")
  return response.data
}

export const getProductDetailsAxios = async (id: number) => {
  const response = await apiClient.get(`/products/${id}`)
  return response.data
}

export const createProductAxios = async (product: any) => {
  const response = await apiClient.post(`/products`, product)
  return response.data
}

export const deleteProduct = async (id: number) => {
  await apiClient.delete(`/products/${id}`)
}
