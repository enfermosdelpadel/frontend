import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (index === "last") index = context.order?.length - 1;
  return (
    <Layout>
      <div className="flex w-80 relative justify-center items-center mb-5">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer" />
        </Link>

        <h1>My Orders</h1>
      </div>
      <div className=" bg-white flex flex-col w-80 rounded-lg border border-black p-3">
        {context.order?.[index]?.products?.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageURL={product.image}
            price={"$" + product.price}
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
