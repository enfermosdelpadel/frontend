import { useContext } from "react"
import { Link } from "react-router-dom"
import Layout from "../../Components/Layout"
import OrdersCard from "../../Components/OrdersCard"
import { ShoppingCartContext } from "../../Context"

function MyOrders() {
  const { orders } = useContext(ShoppingCartContext)

  return (
    <Layout>
      <div className="flex w-80 mb-4 relative justify-center items-center">
        <h1 className="font-medium text-xl">Mis Órdenes</h1>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {orders.map((order) => (
          <Link key={order.id} to={`/my-orders/${order.id}`}>
            <OrdersCard
              index={order.id}
              totalPrice={order.total}
              totalProds={order.quantity}
              datePurchase={order.order_date}
              status={order.status}
            />
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default MyOrders
