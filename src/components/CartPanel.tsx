"use client";

import { formatCOP } from "@/lib/format";
import { useCart } from "@/patterns/singleton/useCart";

export default function CartPanel({ onCheckout }: { onCheckout: () => void }) {
  const { items, subtotal, updateQty, removeItem } = useCart();

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Carrito</h2>

      {items.length === 0 ? (
        <p className="text-sm text-neutral-500">Tu carrito está vacío.</p>
      ) : (
        <ul className="mb-4 space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-neutral-500">{formatCOP(item.price)} c/u</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="h-6 w-6 rounded border border-neutral-300 text-neutral-600"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="h-6 w-6 rounded border border-neutral-300 text-neutral-600"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-2 text-neutral-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold">
        <span>Subtotal</span>
        <span>{formatCOP(subtotal)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="mt-4 w-full rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        Ir a pagar
      </button>
    </div>
  );
}
