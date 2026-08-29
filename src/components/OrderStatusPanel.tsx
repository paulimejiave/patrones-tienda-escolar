"use client";

import { useState } from "react";
import { PedidoContext } from "@/patterns/state/PedidoContext";

export default function OrderStatusPanel({ pedido }: { pedido: PedidoContext }) {
  const [statusName, setStatusName] = useState(pedido.getStateName());
  const [historial, setHistorial] = useState(pedido.getHistorial());
  const [mensaje, setMensaje] = useState("");

  function sync() {
    setStatusName(pedido.getStateName());
    setHistorial([...pedido.getHistorial()]);
  }

  function avanzar() {
    try {
      pedido.avanzar();
      sync();
      setMensaje("");
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : "No se pudo avanzar.");
    }
  }

  function cancelar() {
    try {
      pedido.cancelar();
      sync();
      setMensaje("");
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : "No se pudo cancelar.");
    }
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        Patrón State — ciclo de vida del pedido
      </p>
      <h3 className="mt-1 text-lg font-semibold">Estado actual: {statusName}</h3>
      <p className="mt-1 text-sm text-neutral-500">{historial.join(" → ")}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={avanzar}
          className="flex-1 rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700"
        >
          Avanzar estado
        </button>
        <button
          onClick={cancelar}
          className="flex-1 rounded border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
        >
          Cancelar pedido
        </button>
      </div>

      {mensaje && (
        <p className="mt-3 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {mensaje}
        </p>
      )}
    </div>
  );
}
