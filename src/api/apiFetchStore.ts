export const getProducts = async (signal: AbortSignal) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      signal,
    })
    if (!response.ok)
      throw new Error(`http помилка, статус: ${response.status}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
