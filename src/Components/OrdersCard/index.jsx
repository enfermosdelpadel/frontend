import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import {
  TruckIcon,
  CalendarIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid"

const OrdersCard = (props) => {
  const {
    index,
    totalPrice,
    totalProds,
    datePurchase,
    status,
    orderNumber,
    cancelOrder,
  } = props

  const handleCancel = (id) => {
    cancelOrder(id)
    console.log(id)
  }

  return (
    <article className="flex flex-col w-full mb-5 h-40">
      <Toaster gutter={30} duration={4000} position="bottom-center" />
      <div className="bg-white border w-full">
        <div className="bg-gray-200 px-4 py-2 flex justify-between">
          <div className="flex gap-2">
            <CalendarIcon className="h-6 w-6 text-black cursor-pointer" />
            <span className="font-light">
              {new Date(datePurchase).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <span className="font-light">Orden número:</span>
            {orderNumber}
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-row justify-center border-t border-black p-3 gap-4 h-full">
        <div className="flex gap-4">
          <div className="flex gap-2 items-center mb-2">
            <ShoppingCartIcon className="h-6 w-6 text-black cursor-pointer" />
            <span className="font-light">{totalProds} artículos </span>
          </div>
          <div className="flex gap-2 items-center mb-2">
            <TruckIcon className="h-6 w-6 text-black cursor-pointer" />

            <span
              className={`${
                status === "Pendiente"
                  ? "bg-yellow-200"
                  : status === "Entregado"
                  ? "bg-blue-200"
                  : status === "Enviado"
                  ? "bg-green-200"
                  : status === "Cancelado"
                  ? "bg-red-200"
                  : "bg-gray-200"
              } px-2 py-1 rounded-full`}
            >
              {status === "Enviado" ? "En Camino" : status}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <ShoppingBagIcon className="h-6 w-6 text-black cursor-pointer" />
            <span className="font-medium text-2xl">
              {totalPrice?.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })}
            </span>
          </div>
        </div>
        <div className="flex gap-2 justify-end items-center ml-auto">
          <Link to={`/my-orders/${index}`}>
            <button className="bg-blue-600 text-white p-2 rounded-lg">
              Ver detalles
            </button>
          </Link>
          <button
            onClick={() => handleCancel(index)}
            disabled={status !== "Pendiente"}
            className={`bg-red-600 text-white p-2 rounded-lg ${
              status !== "Pendiente" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </article>
  )
}

export default OrdersCard
