import { getProducts, getProductDetails } from "@/api/apiFetchStore"
import { useRef, useState } from "react"
import { Product } from "./Product"
import { Button } from "./ui/button"

interface ProductItem {
  id: number
  title: string
  price: string
  description: string
  category: string
  image: string
}

export function FetchAPIStore() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [isLoader, setIsLoader] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [productDetails, setProductDetails] = useState<Partial<ProductItem>>({})
  const [productDetailsLoader, setProductDetailsLoader] =
    useState<boolean>(false)

  const productDetailsController = useRef<AbortController | null>(null)
  const controller = useRef<AbortController | null>(null)

  const loadProducts = async () => {
    // 1. Скасовуємо попередній запит, якщо він ще триває
    controller.current?.abort()
    controller.current = new AbortController()
    setErrorMessage(null)

    // Встановлюємо таймаут на 5 секунд
    const timeoutId = setTimeout(() => {
      controller.current?.abort()
      setErrorMessage("Час очікування запиту минув (Timeout 5s)")
    }, 5000)

    setIsLoader(true)
    try {
      const data = await getProducts(controller.current.signal)

      if (!data) {
        setErrorMessage("Дані не отримано або запит скасовано")
        return
      }

      setProducts(data)
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Запит скасовано користувачем або таймаутом")
      } else {
        console.error("Помилка завантаження товарів:", error)
        setErrorMessage("Не вдалося завантажити товари")
      }
    } finally {
      setIsLoader(false)
      clearTimeout(timeoutId)
      controller.current = null
    }
  }

  const loadProductDetails = async (id: number) => {
    // 1. Скасовуємо попередній запит деталей, якщо він ще триває
    productDetailsController.current?.abort()
    productDetailsController.current = new AbortController()

    // Встановлюємо таймаут на 5 секунд
    const timeoutId = setTimeout(() => {
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
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Запит деталей скасовано")
      } else {
        console.error("Помилка завантаження деталей:", error)
      }
    } finally {
      setProductDetailsLoader(false)
      clearTimeout(timeoutId)
      productDetailsController.current = null
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl text-amber-600 dark:text-amber-500">
        Fetch API Store
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Панель керування */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Керування запитами (GET)
          </h2>
          <p className="text-xs text-slate-500">
            Запити робляться через стандартний <code>fetch</code> з використанням <code>AbortController</code> для таймауту та скасування дублікатів.
          </p>
          <Button
            onClick={loadProducts}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            disabled={isLoader}
          >
            {isLoader ? "Завантаження..." : "Завантажити товари"}
          </Button>

          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50 dark:border-red-900/50">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Список товарів */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Список товарів
          </h2>

          {isLoader && (
            <div className="flex h-40 items-center justify-center text-slate-500">
              Завантаження товарів...
            </div>
          )}

          {!isLoader && products.length === 0 && (
            <div className="flex h-40 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800 text-sm">
              Товари ще не завантажено.
            </div>
          )}

          <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1">
            {!isLoader &&
              products.map((product) => (
                <Product
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  onClick={() => loadProductDetails(product.id)}
                />
              ))}
          </div>
        </div>

        {/* Детальна інформація */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
            Деталі товару (GET за ID)
          </h2>

          {productDetailsLoader && (
            <div className="flex h-64 items-center justify-center text-slate-500">
              Завантаження деталей...
            </div>
          )}

          {!productDetailsLoader && !productDetails.id && (
            <div className="flex h-64 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800 text-sm">
              Оберіть товар зі списку, щоб переглянути його деталі.
            </div>
          )}

          {!productDetailsLoader && productDetails.id && (
            <div className="space-y-4">
              <div className="flex justify-center bg-white p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                <img
                  src={productDetails.image}
                  alt={productDetails.title}
                  className="max-h-48 object-contain"
                />
              </div>
              <div className="space-y-2">
                <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {productDetails.category}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
                  {productDetails.title}
                </h3>
                <p className="text-xs font-semibold text-slate-550 dark:text-slate-400">
                  ID: {productDetails.id}
                </p>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-500">
                  ${productDetails.price}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {productDetails.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

