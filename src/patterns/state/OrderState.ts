import type { PedidoContext } from "./PedidoContext";

/**
 * PATRÓN: State — Rol: "State"
 * Cada estado decide qué pasa cuando se intenta avanzar o cancelar el
 * pedido estando en él: puede permitir la transición (moviendo al
 * contexto al siguiente estado) o rechazarla.
 */
export interface OrderState {
  readonly name: string;
  avanzar(context: PedidoContext): void;
  cancelar(context: PedidoContext): void;
}
