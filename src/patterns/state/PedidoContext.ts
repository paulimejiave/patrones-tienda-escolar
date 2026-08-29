import type { OrderState } from "./OrderState";
import { PendienteState } from "./PendienteState";

/**
 * PATRÓN: State — Rol: "Context"
 * Mantiene una referencia al estado actual y le delega todo el
 * comportamiento del ciclo de vida del pedido. Es el propio estado
 * quien decide mover al contexto al siguiente (context.setState(...)).
 */
export class PedidoContext {
  private state: OrderState;
  private historial: string[] = [];

  constructor(estadoInicial: OrderState = new PendienteState()) {
    this.state = estadoInicial;
    this.historial.push(estadoInicial.name);
  }

  setState(state: OrderState) {
    this.state = state;
    this.historial.push(state.name);
  }

  getStateName(): string {
    return this.state.name;
  }

  getHistorial(): string[] {
    return this.historial;
  }

  avanzar() {
    this.state.avanzar(this);
  }

  cancelar() {
    this.state.cancelar(this);
  }
}
