import { useContext } from "react"
import { Link } from "react-router-dom"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { ShoppingCartContext } from "../../Context"
import OrderCard from "../../Components/OrderCard"
import { totalPrice } from "../../utils"
import "./styles.css"

const CheckoutSideMenu = () => {
  const {
    cartProds,
    setCartProds,
    order,
    setOrder,
    closeCheckoutSideMenu,
    isCheckoutSideMenuOpen,
  } = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProds = cartProds.filter((product) => product.id != id)
    setCartProds(filteredProds)
  }

  function getCurrentDateFormatted() {
    const date = new Date()

    const options = { year: "numeric", month: "numeric", day: "numeric" }
    return date.toLocaleDateString("es-ES", options)
  }

  const currentDate = getCurrentDateFormatted()

  const handleCheckout = () => {
    const orderToAdd = {
      datePurchase: currentDate,
      products: cartProds,
      totalProds: cartProds.length,
      totalPrice: totalPrice(cartProds),
    }
    setOrder([...order, orderToAdd])
    setCartProds([])
  }

  const ShoppingCart = () => {
    handleCheckout()
    closeCheckoutSideMenu()
  }

  return (
    <aside
      className={`${
        isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Mi orden</h2>
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
            title={product.type + "  " + product.brand}
            imageURL={product.image}
            price={product.price.toLocaleString("es-AR", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "ARS",
              useGrouping: true,
            })}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">{totalPrice(cartProds)}</span>
        </p>
        <Link to="/my-orders/last">
          <button
            className="w-full bg-gray-600 py-3 text-white rounded-lg"
            onClick={() => ShoppingCart()}
          >
            Finalizar compra
          </button>
        </Link>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu
