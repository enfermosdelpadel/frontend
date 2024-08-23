import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { totalPrice } from "../../utils";
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProds = context.cartProds.filter(
      (product) => product.id != id
    );
    context.setCartProds(filteredProds);
  };

  function getCurrentDateFormatted() {
    const date = new Date();
    // calendar in spanish
    // const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // return date.toLocaleDateString('es-ES', options);
    return date.toLocaleDateString();
  }

  const currentDate = getCurrentDateFormatted();

  const handleCheckout = () => {
    const orderToAdd = {
      datePurchase: currentDate,
      products: context.cartProds,
      totalProds: context.cartProds.length,
      totalPrice: totalPrice(context.cartProds),
    };
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProds([]);
  };

  const ShoppingCart = () => {
    handleCheckout();
    context.closeCheckoutSideMenu();
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          ></XMarkIcon>
        </div>
      </div>
      <div className="px-5 overflow-y-scroll flex-1">
        {context.cartProds.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageURL={product.image}
            price={"$" + product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">
            ${totalPrice(context.cartProds)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="w-full bg-black py-3 text-white rounded-lg"
            onClick={() => ShoppingCart()}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
