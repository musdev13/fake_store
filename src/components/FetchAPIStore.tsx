import { getProducts } from "@/api/apiFetchStore"
import { useEffect, useRef, useState } from "react"
import { Product } from "./Product"
import { Button } from "./ui/button"

export function FetchAPIStore() {
  const [products, setProducts] = useState<any[]>([])
  const [isLoader, setIsLoader] = useState<boolean>(false)

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
            />
          ))}
        </div>
        <div className="border-2 border-amber-600 p-6">
          erdgsaergwaergawerg grea aser
        </div>
      </div>
    </div>
  )
}
