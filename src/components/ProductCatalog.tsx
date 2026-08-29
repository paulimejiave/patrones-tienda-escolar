"use client";

import { useState } from "react";
import { formatCOP } from "@/lib/format";
import { Product } from "@/lib/types";
import { useCart } from "@/patterns/singleton/useCart";

export default function ProductCatalog({ products }: { products: Product[] }) {
  const { addItem } = useCart();

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Catálogo</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addItem} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-2 text-3xl">{product.emoji}</div>
      <h3 className="font-medium">{product.name}</h3>
      <p className="text-sm text-neutral-500">Stock: {product.stock}</p>
      <p className="mt-1 font-semibold">{formatCOP(product.price)}</p>
      <div className="mt-3 flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={product.stock}
          value={qty}
          onChange={(e) =>
            setQty(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1)))
          }
          className="w-16 rounded border border-neutral-300 px-2 py-1 text-sm"
        />
        <button
          onClick={() => onAdd(product, qty)}
          className="flex-1 rounded bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
