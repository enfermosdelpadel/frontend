import { useContext } from "react"
import { Link } from "react-router-dom"
import Layout from "../../Components/Layout"
import OrdersCard from "../../Components/OrdersCard"
import { ShoppingCartContext } from "../../Context"
import Spinner from "../../Components/Spinner"

function MyOrders() {
  const { orders, loading } = useContext(ShoppingCartContext)

  return (
    <Layout>
      <div className="flex w-80 mb-4 relative justify-center items-center pt-8">
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
      <Spinner loading={loading} />
    </Layout>
  )
}

export default MyOrders
