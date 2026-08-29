import type { OrderState } from "./OrderState";
import type { PedidoContext } from "./PedidoContext";
import { CanceladoState } from "./CanceladoState";
import { PagadoState } from "./PagadoState";

/** PATRÓN: State — Rol: "ConcreteState" */
export class PendienteState implements OrderState {
  readonly name = "Pendiente";

  avanzar(context: PedidoContext): void {
    context.setState(new PagadoState());
  }

  cancelar(context: PedidoContext): void {
    context.setState(new CanceladoState());
  }
}
