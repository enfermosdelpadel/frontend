import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"

function CardConfirm() {
  const {
    openCheckoutSideMenu,
    closeProdDetail,
    setCartProds,
    setCount,
    cartProds,
    setOpenModal,
    count,
    prodToShow,
    toast,
  } = useContext(ShoppingCartContext)
  let [quantity, setQuantity] = useState(1)
  let [selectedSize, setSelectedSize] = useState(null)

  const addProdToCart = (event, productData) => {
    event.stopPropagation()
    if (
      quantity > prodToShow.stock ||
      ((prodToShow.type.includes("Indumentaria") ||
        prodToShow.type.includes("Zapatillas")) &&
        !selectedSize)
    ) {
      if (quantity > prodToShow.stock) {
        toast.error("No hay stock suficiente")
      } else {
        toast.error("Debes seleccionar un talle")
      }
      return
    }
    setCount(count + 1)
    setCartProds([...cartProds, productData])
    openCheckoutSideMenu()
    closeProdDetail()
    setOpenModal(false)
  }

  const closeModal = () => {
    setOpenModal(false)
    closeProdDetail()
  }

  let name =
    prodToShow.type +
    " " +
    prodToShow.sub_type +
    " " +
    prodToShow.brand +
    " " +
    prodToShow.model

  const renderSize = () => {
    if (
      prodToShow.type.includes("Indumentaria") ||
      prodToShow.type.includes("Zapatillas")
    ) {
      return (
        <div>
          <span className="font-light">Talle: {selectedSize}</span>
          <div className="flex flex-row gap-2">
            {prodToShow.size
              .sort((a, b) => a.localeCompare(b))
              .map((size, index) => (
                <div key={index} className="mt-2">
                  <a
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-2 w-8 h-8 rounded-full cursor-pointer"
                    value={size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </a>
                </div>
              ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-1/2 h-96 relative">
      <div className="bg-white rounded-lg w-full h-full p-2 pt-6">
        <div className="flex justify-end">
          <button
            onClick={() => closeModal()}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <figure className=" relative shrink-0 overflow-hidden h-80 mb-6 mx-auto w-4/5 rounded-3xl">
            <img
              className="w-full h-full object-contain rounded-lg"
              src={prodToShow.image}
              alt={prodToShow.type}
            />
          </figure>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{name}</h2>
            <div className="flex flex-row gap-2">
              <p className="text-lg font-semibold">
                {prodToShow.price.toLocaleString("es-AR", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "ARS",
                  useGrouping: true,
                })}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {renderSize()}
              <div className="flex flex-row gap-2 pt-2">
                <div className="relative flex items-center max-w-[8rem]">
                  <div>
                    <label htmlFor="Quantity" className="sr-only">
                      {" "}
                      Quantity{" "}
                    </label>

                    <div className="flex items-center rounded border border-gray-200">
                      <button
                        type="button"
                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        readOnly
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="h-10 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                      />

                      <button
                        type="button"
                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(event) =>
                    addProdToCart(event, {
                      ...prodToShow,
                      size: selectedSize,
                      quantity,
                    })
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CardConfirm }
