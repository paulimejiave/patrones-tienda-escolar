/**
 * PATRÓN: Singleton
 * Garantiza que exista una única instancia del carrito en toda la
 * aplicación. El constructor es privado: la única forma de obtener el
 * carrito es a través de CartStore.getInstance(), que siempre devuelve
 * la misma instancia sin importar desde qué componente se llame.
 */
import { CartItem, Product } from "@/lib/types";

type Listener = () => void;

export class CartStore {
  private static instance: CartStore | null = null;

  private items: CartItem[] = [];
  private listeners = new Set<Listener>();

  private constructor() {}

  static getInstance(): CartStore {
    if (!CartStore.instance) {
      CartStore.instance = new CartStore();
    }
    return CartStore.instance;
  }

  getItems(): CartItem[] {
    return this.items;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  addItem(product: Product, qty: number) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      this.items = this.items.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + qty } : i
      );
    } else {
      this.items = [
        ...this.items,
        { id: product.id, name: product.name, price: product.price, qty },
      ];
    }
    this.notify();
  }

  updateQty(productId: string, delta: number) {
    this.items = this.items.map((i) =>
      i.id === productId ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    );
    this.notify();
  }

  removeItem(productId: string) {
    this.items = this.items.filter((i) => i.id !== productId);
    this.notify();
  }

  clear() {
    this.items = [];
    this.notify();
  }

  getSubtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}
