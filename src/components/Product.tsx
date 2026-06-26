
interface ProductProps {
    title: string
    image: string
    price: string
}

export function Product({title, image, price}: ProductProps) {
    return (
        <div className="p-2 border rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 transition border-slate-100 dark:border-slate-800">
            <img src={image} alt={title} className="w-8 h-8 object-contain bg-white rounded p-0.5"/>
            <div className="flex-1 min-w-0">
                <h2 className="text-xs font-medium truncate text-slate-800 dark:text-slate-200">{title}</h2>
                <span className="text-[10px] text-blue-600 font-bold">{price}</span>
            </div>

        </div>
    )
}