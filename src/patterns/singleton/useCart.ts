"use client";

import { useSyncExternalStore } from "react";
import { CartItem } from "@/lib/types";
import { CartStore } from "./CartStore";

const store = CartStore.getInstance();
const EMPTY_CART: CartItem[] = [];

/**
 * Puente entre el Singleton (una clase de TypeScript común) y React.
 * Cualquier componente que llame a useCart() está leyendo del mismo
 * CartStore — es el mismo objeto en memoria, no una copia.
 */
export function useCart() {
  const items = useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getItems(),
    () => EMPTY_CART // getServerSnapshot: en el servidor no existe carrito, se hidrata vacío
  );

  return {
    items,
    subtotal: store.getSubtotal(),
    addItem: store.addItem.bind(store),
    updateQty: store.updateQty.bind(store),
    removeItem: store.removeItem.bind(store),
    clear: store.clear.bind(store),
    store,
  };
}
