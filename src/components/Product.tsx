interface ProductProps {
  title: string
  image: string
  price: string
  onClick: () => void
}

export function Product({ title, image, price, onClick }: ProductProps) {
  return (
    <div
      className="dark:hover:bg-slate-850 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 p-2 transition hover:bg-slate-700 dark:border-slate-800"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="h-8 w-8 rounded bg-white object-contain p-0.5"
      />
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-xs font-medium text-slate-800 dark:text-slate-200">
          {title}
        </h2>
        <span className="text-[10px] font-bold text-blue-600">{price}</span>
      </div>
    </div>
  )
}
