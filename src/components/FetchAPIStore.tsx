import { getProducts } from "@/api/apiFetchStore";
import { useEffect, useState } from "react"
import { Product } from "./Product";

export function FetchAPIStore(){
    const [products, setProducts] = useState<any[]>([]);
    useEffect(()=>{
        getProducts().then((data)=>{
            setProducts(data);
        });
    },[]);
    return <div>
        <h1>Fetch API Store</h1>
        <div className="grid gap-2 grid-cols-3">
            {products.map((product)=>
                <Product title={product.title} image={product.image} price={product.price}/>
            )}
        </div>
        </div>
}