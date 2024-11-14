import { useContext } from "react"
import {
  XMarkIcon,
  ExclamationCircleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid"
import { ShoppingCartContext } from "../../Context"
import OrderCard from "../../Components/OrderCard"
import { totalPrice } from "../../utils"
import "./styles.css"

const CheckoutSideMenu = () => {
  const {
    cartProds,
    setCartProds,
    closeCheckoutSideMenu,
    isCheckoutSideMenuOpen,
    setModalCheckout,
    createAndSendOrder,
    isUserLogin,
  } = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProds = cartProds.filter((product) => product.id != id)
    setCartProds(filteredProds)
  }

  const totalProds = cartProds.reduce(
    (acc, product) => acc + product.quantity,
    0
  )

  const ShoppingCart = () => {
    createAndSendOrder(totalPrice(cartProds), totalProds, cartProds)
    closeCheckoutSideMenu()
    setModalCheckout(true)
  }

  const renderButton = () => {
    if (cartProds.length > 0) {
      if (isUserLogin) {
        return (
          <button
            className="w-full bg-green-600 py-3 text-white rounded-lg"
            onClick={() => ShoppingCart()}
          >
            Finalizar compra
          </button>
        )
      } else {
        return (
          <button
            className="w-full bg-cyan-600 py-3 text-white rounded-lg"
            onClick={() => (window.location.href = "/sign-in")}
          >
            <ArrowRightStartOnRectangleIcon className="h-6 w-6 inline-block mr-2" />
            Debes iniciar sesión o registrarte
          </button>
        )
      }
    } else {
      return (
        <button className="w-full bg-gray-600 py-3 text-white rounded-lg">
          <ExclamationCircleIcon className="h-6 w-6 inline-block mr-2" />
          El carrito de compras est vacío.
        </button>
      )
    }
  }

  return (
    <aside
      className={`${
        isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl capitalize">Mi orden</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => closeCheckoutSideMenu()}
          ></XMarkIcon>
        </div>
      </div>
      <div className="px-5 overflow-y-scroll flex-1">
        {cartProds.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.sub_type + "  " + product.brand}
            imageURL={product.image}
            size={product.size}
            price={(product.price * product.quantity).toLocaleString("es-AR", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "ARS",
              useGrouping: true,
            })}
            quantity={product.quantity}
            handleDelete={handleDelete}
            type={product.type}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">
            {totalPrice(cartProds).toLocaleString("es-AR", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "ARS",
              useGrouping: true,
            })}
          </span>
        </p>
        {renderButton()}
      </div>
    </aside>
  )
}

export default CheckoutSideMenu
