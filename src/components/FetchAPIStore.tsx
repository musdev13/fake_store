import { getProducts } from "@/api/apiFetchStore";
import { useEffect, useState } from "react"

export function FetchAPIStore(){
    const [products, setProducts] = useState<any[]>([]);
    useEffect(()=>{
        getProducts().then((data)=>{
            setProducts(data);
        });
    },[]);
    return <div>
        <h1>Fetch API Store</h1>
        <ul>
            {products.map((product)=>
                <li key={product.id}>{product.title}</li>
            )}
        </ul>
        </div>
}