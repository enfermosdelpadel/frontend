import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import Layout from "../../Components/Layout"
import OrderCard from "../../Components/OrderCard"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
// import { totalPrice } from "../../utils"

function MyOrder() {
  const { orderDetails } = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  const order_id = currentPath.substring(currentPath.lastIndexOf("/") + 1)

  return (
    <Layout>
      <div className="flex w-80 relative justify-center items-center mb-5">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>

        <h1>Mis Órdenes</h1>
      </div>
      <div className=" bg-white flex flex-col w-1/2 rounded-lg border border-black p-3">
        {orderDetails
          .filter((product) => product.order_id === parseInt(order_id))
          .map((product) => (
            <OrderCard
              key={product.products.id}
              id={product.products.id}
              title={
                product.products.sub_type +
                " " +
                product.products.brand +
                " " +
                product.products.model
              }
              imageURL={product.products.image_url}
              price={product.unit_price.toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })}
              size={product.size}
              quantity={product.quantity}
              type={product.products.type}
            />
          ))}
        <div className="flex justify-between items-center mb-3 border-t border-black mt-3 pt-3">
          <div className="text-lg font-medium">Total de la Orden</div>
          <div className="text-lg font-medium">
            {orderDetails
              ?.filter((order) => order.order_id === parseInt(order_id))
              .reduce((acc, curr) => acc + curr.unit_price * curr.quantity, 0)
              .toLocaleString("es-AR", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "ARS",
                useGrouping: true,
              })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyOrder
