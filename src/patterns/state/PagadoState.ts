import type { OrderState } from "./OrderState";
import type { PedidoContext } from "./PedidoContext";
import { EnviadoState } from "./EnviadoState";

/** PATRÓN: State — Rol: "ConcreteState" */
export class PagadoState implements OrderState {
  readonly name = "Pagado";

  avanzar(context: PedidoContext): void {
    context.setState(new EnviadoState());
  }

  cancelar(): void {
    throw new Error(
      "Un pedido pagado ya no se puede cancelar directamente; debe gestionarse como devolución."
    );
  }
}
