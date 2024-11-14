import {
  TruckIcon,
  CalendarIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid"

const OrdersCard = (props) => {
  const { totalPrice, totalProds, datePurchase, status } = props

  return (
    <article className="flex flex-col w-96 mb-5">
      <div className="bg-white border">
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
        </div>
      </div>
      <div className="bg-white flex flex-col border-t border-black p-3">
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
            {status}
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
    </article>
  )
}

export default OrdersCard
