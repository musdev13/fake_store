import React, { useState } from "react"
import { Button } from "./ui/button"
import { getProductDetailsAxios, getProductsAxios } from "@/api/apiAxiosStore"
import { AwardIcon } from "lucide-react"

interface ProductItem {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export function AxiosAPIStore() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDetailsLoading, setIsDetailsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  })

  // 1. GET ALL PRODUCTS
  const handleGetProducts = async () => {
    setIsLoading(true)
    try {
      // console.log("Load products placeholder")
      const data = await getProductsAxios();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // 2. GET SINGLE PRODUCT DETAILS
  const handleGetProductDetails = async (id: number) => {
    setIsDetailsLoading(true)
    try {
      // console.log(`Load product details for ID: ${id}`)
      const data = await getProductDetailsAxios(id);
      setSelectedProduct(data);
    } catch (error) {
      console.error("Error loading product details:", error)
    } finally {
      setIsDetailsLoading(false)
    }
  }

  // 3. POST NEW PRODUCT
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // TODO: Implement POST request to https://fakestoreapi.com/products using Axios
      console.log("Create product placeholder with data:", form)
      
      // Reset form
      setForm({
        title: "",
        price: "",
        description: "",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      })
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // 4. DELETE PRODUCT
  const handleDeleteProduct = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent selecting product
    try {
      // TODO: Implement DELETE request to https://fakestoreapi.com/products/:id using Axios
      console.log(`Delete product ID: ${id}`)
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl text-sky-655 dark:text-sky-400">
        Axios API Store
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form and fetch button section */}
        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-250">
              Add New Product (POST)
            </h2>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1 text-slate-500">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter product title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-500">Price</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  placeholder="Enter product price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-500">Description</label>
                <textarea
                  required
                  placeholder="Enter description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Product"}
              </Button>
            </form>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          <div>
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              Fetch Control (GET)
            </h2>
            <Button onClick={handleGetProducts} className="w-full" disabled={isLoading}>
              {isLoading ? "Loading products..." : "Get All Products"}
            </Button>
          </div>
        </div>

        {/* Products List Section */}
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Products List
          </h2>
          
          {isLoading && (
            <div className="flex h-40 items-center justify-center text-slate-500">
              Loading...
            </div>
          )}

          {!isLoading && products.length === 0 && (
            <div className="flex h-40 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800">
              No products loaded yet.
            </div>
          )}

          <div className="max-h-[500px] overflow-y-auto space-y-2 pr-1">
            {!isLoading &&
              products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleGetProductDetails(product.id)}
                  className="group flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-100 p-2.5 transition hover:bg-slate-50 dark:border-slate-805 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-10 w-10 rounded bg-white object-contain p-0.5 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {product.title}
                      </h3>
                      <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => handleDeleteProduct(product.id, e)}
                    className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400"
                    title="Delete product"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Product Details Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
            Product Details (GET by ID)
          </h2>

          {isDetailsLoading && (
            <div className="flex h-64 items-center justify-center text-slate-500">
              Loading details...
            </div>
          )}

          {!isDetailsLoading && !selectedProduct && (
            <div className="flex h-64 items-center justify-center text-slate-500 border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-800">
              Click a product to view details.
            </div>
          )}

          {!isDetailsLoading && selectedProduct && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-center bg-white p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="max-h-48 object-contain"
                />
              </div>
              <div>
                <span className="inline-block rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                  {selectedProduct.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-800 dark:text-white leading-tight">
                  {selectedProduct.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  ID: {selectedProduct.id}
                </p>
                <div className="mt-2 text-2xl font-black text-sky-600 dark:text-sky-400">
                  ${selectedProduct.price}
                </div>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
