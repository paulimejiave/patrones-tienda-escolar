import type { OrderState } from "./OrderState";
import type { PedidoContext } from "./PedidoContext";
import { EntregadoState } from "./EntregadoState";

/** PATRÓN: State — Rol: "ConcreteState" */
export class EnviadoState implements OrderState {
  readonly name = "Enviado";

  avanzar(context: PedidoContext): void {
    context.setState(new EntregadoState());
  }

  cancelar(): void {
    throw new Error("Un pedido ya enviado no se puede cancelar.");
  }
}
