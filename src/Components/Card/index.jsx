import { CheckIcon, ShoppingCartIcon } from "@heroicons/react/24/solid"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"

const Card = (data) => {
  const {
    openProdDetail,
    closeCheckoutSideMenu,
    setProdToShow,
    cartProds,
    setOpenModal,
  } = useContext(ShoppingCartContext)
  const showProduct = (productDetail) => {
    openProdDetail()
    setProdToShow(productDetail)
    closeCheckoutSideMenu()
  }

  const confirmProd = (event, productData) => {
    event.stopPropagation()
    setProdToShow(productData)
    setOpenModal(true)
  }
  const renderButton = (id) => {
    if (data.data.stock == 0) {
      return (
        <button className="bg-gray-600 hover:bg-gray-700 rounded-b-lg text-white h-10">
          <span className="mr-2">Sin stock</span>
        </button>
      )
    } else {
      const isInCart =
        cartProds.filter((product) => product.id == id).length > 0
      if (isInCart) {
        return (
          <button className="bg-blue-600 hover:bg-gray-700 rounded-b-lg text-white h-10">
            <span className="mr-2">En el carrito</span>{" "}
            <CheckIcon className="h-4 w-4 inline-block" />
          </button>
        )
      } else {
        return (
          <button
            className="bg-green-600 hover:bg-green-700 rounded-b-lg text-white h-10"
            // onClick={(event) => addProdToCart(event, data.data)}
            onClick={(event) => confirmProd(event, data.data)}
          >
            <span className="mr-2">Comprar</span>{" "}
            <ShoppingCartIcon className="h-4 w-4 inline-block" />
          </button>
        )
      }
    }
  }
  return (
    <div
      className="bg-white backdrop-blur border-white-30 shadow-md cursor-pointer w-56 h-72 flex flex-col justify-center rounded-xl select-none"
      onClick={() => showProduct(data.data)}
    >
      <figure className="relative shrink-0 overflow-hidden h-3/4 mb-6 mx-auto w-4/5 rounded-3xl mb-2">
        <span className="absolute bottom-0 left-0 bg-gray-200 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {/* El ? después de category ayuda a que renderice de igual forma el sitio */}
          {data.data.type}
        </span>
        <img
          className="w-full h-full object-contain rounded-lg"
          src={data.data.image}
          alt={data.data.sub_type}
        />
      </figure>
      <p className="flex justify-between items-center px-4">
        <span className="text-sm font-light truncate">
          {data.data.sub_type} {data.data.brand}
        </span>
        <span className="text-ls font-medium">
          {data.data.price?.toLocaleString("es-AR", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "ARS",
            useGrouping: true,
          })}
        </span>
      </p>
      {renderButton(data.data.id)}
    </div>
  )
}

export default Card
