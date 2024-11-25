import { useContext } from "react"
import Layout from "../../Components/Layout"
import OrdersCard from "../../Components/OrdersCard"
import { ShoppingCartContext } from "../../Context"
import Spinner from "../../Components/Spinner"

function MyOrders() {
  const { orders, loading } = useContext(ShoppingCartContext)

  const ordersbyDate = orders.sort((a, b) => {
    return new Date(b.order_date) - new Date(a.order_date)
  })

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="flex w-3/4 mb-4 relative justify-center items-center pt-8">
          <h1 className="font-medium text-xl">No tienes órdenes</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex w-3/4 mb-4 relative justify-center items-center pt-8">
        <h1 className="font-medium text-xl">Mis Órdenes</h1>
      </div>
      <div className="flex flex-col w-1/2">
        {ordersbyDate.map((order) => (
          <OrdersCard
            key={order.id}
            orderNumber={order.order_number}
            index={order.id}
            totalPrice={order.total}
            totalProds={order.quantity}
            datePurchase={order.order_date}
            status={order.status}
          />
        ))}
      </div>
      <Spinner loading={loading} />
    </Layout>
  )
}

export default MyOrders
