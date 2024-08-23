import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";
import { ShoppingCartContext } from "../../Context";

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className="flex w-80 mb-4 relative justify-center items-center">
        <h1 className="font-medium text-xl">My Orders</h1>
      </div>

      {context.order.map((order, index) => (
        <Link key={index} to={`/my-orders/${index}`}>
          <OrdersCard
            totalPrice={order.totalPrice}
            totalProds={order.totalProds}
            datePurchase={order.datePurchase}
          />
        </Link>
      ))}
    </Layout>
  );
}

export default MyOrders;
