import { getProducts, getProductDetails } from "@/api/apiFetchStore"
import { useRef, useState } from "react"
import { Product } from "./Product"
import { Button } from "./ui/button"

export function FetchAPIStore() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoader, setIsLoader] = useState<boolean>(false)

  const [productDetails, setProductDetails] = useState<any>({})
  const [productDetailsLoader, setProductDetailsLoader] =
    useState<boolean>(false)

  const productDetailsController = useRef<AbortController | null>(null)

  const controller = useRef<AbortController | null>(null)

  const loadProducts = async () => {
    controller.current?.abort()
    controller.current = new AbortController()

    const id = setTimeout(() => {
      controller.current?.abort()
    }, 5000)

    setIsLoader(true)
    try {
      const data = await getProducts(controller.current.signal)

      if (!data) {
        console.log("No data")
        return
      }

      setProducts(data)
      clearTimeout(id)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoader(false)
      controller.current = null
      clearTimeout(id)
    }
  }

  const loadProductDetails = async (id: number) => {
    productDetailsController.current?.abort()
    productDetailsController.current = new AbortController()

    const idTimeout = setTimeout(() => {
      productDetailsController.current?.abort()
    }, 5000)

    setProductDetailsLoader(true)
    try {
      const data = await getProductDetails(
        id,
        productDetailsController.current.signal
      )

      if (!data) {
        console.log("No data")
        return
      }

      setProductDetails(data)
      clearTimeout(idTimeout)
    } catch (error) {
      console.log(error)
    } finally {
      setProductDetailsLoader(false)
      productDetailsController.current = null
      clearTimeout(idTimeout)
    }
  }

  return (
    <div>
      <h1 className="mb-5 text-center text-5xl">Fetch API Store</h1>
      <Button onClick={loadProducts} className="mb-6" disabled={isLoader}>
        {isLoader ? "Loading..." : "Load products"}
      </Button>
      <div className="grid grid-cols-2 gap-6">
        <div className="grid grid-cols-3 gap-2">
          {products.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              onClick={() => loadProductDetails(product.id)}
            />
          ))}
        </div>
        <div className="border-2 border-amber-600 p-6">
          {productDetailsLoader ? (
            <div>Loading...</div>
          ) : (
            <div>
              <p>ID: {productDetails.id}</p>
              <h2>{productDetails.title}</h2>
              <p>{productDetails.description}</p>
              <p>{productDetails.price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
