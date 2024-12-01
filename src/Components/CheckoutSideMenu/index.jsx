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
    profile,
    sendEmail,
    user,
  } = useContext(ShoppingCartContext)

  const handleDelete = (id) => {
    const filteredProds = cartProds.filter((product) => product.id != id)
    setCartProds(filteredProds)
  }

  const totalProds = cartProds.reduce(
    (acc, product) => acc + product.quantity,
    0
  )
  //Checkout Mail
  const msg = `
    <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1)">
      <b style="font-size: 1.2rem">Gracias por tu compra! &#129321;</b>
      <p style="margin-top: 1rem; font-size: 1rem">Puedes realizar el pago al siguiente número de cuenta:</p>
      <ul style="list-style: none; padding: 0; margin: 0">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem">
          <tbody>
            <tr>
              <th style="padding: 0.5rem; border: 1px solid #ddd">CBU</th>
              <td style="padding: 0.5rem; border: 1px solid #ddd">212453125533432</td>
            </tr>
            <tr>
              <th style="padding: 0.5rem; border: 1px solid #ddd">Alias</th>
              <td style="padding: 0.5rem; border: 1px solid #ddd">edp.store.mp</td>
            </tr>
          </tbody>
        </table>
      </ul>
      <p style="margin-top: 1rem; font-size: 1rem">Cuando cambie el estado del pedido te estaremos notificando por correo. </p>
      <p style="text-align: center; margin-top: 1.5rem;">
          <a href="https://edp-front.netlify.app/">
            <img
              src="https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/footer-mail.png?t=2024-11-29T23%3A26%3A25.470Z"
              alt="Logo de EDG"
              style="width: 100%; height: auto; max-width: 694px;"
            />
          </a>
        </p></div>`

  const infoMail = {
    to: user?.email,
    subject: "Pedido realizado con exito",
    html: msg,
  }
  // const handleCheckout = () => {
  //   sendEmail(infoMail)
  //   console.log("infoMail")
  //   setModalCheckout(false)
  // }

  const ShoppingCart = () => {
    createAndSendOrder(totalPrice(cartProds), totalProds, cartProds)
    closeCheckoutSideMenu()
    // handleCheckout()
    sendEmail(infoMail)
    setModalCheckout(true)
  }

  const renderButton = () => {
    if (cartProds.length > 0) {
      if (isUserLogin) {
        if (profile?.[0].address !== null) {
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
              className="w-full bg-orange-600 py-3 text-white rounded-lg"
              onClick={() => (window.location.href = "/my-account")}
            >
              <ExclamationCircleIcon className="h-6 w-6 inline-block mr-2" />
              Debes Completar tu perfil!
            </button>
          )
        }
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
          El carrito de compras está vacío.
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
