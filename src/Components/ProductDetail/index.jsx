import { useContext } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { ShoppingCartContext } from "../../Context"
import "./styles.css"

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext)

  return (
    <aside
      className={`${
        context.isProdDetailOpen ? "flex" : "hidden"
      } product-detail flex-col fixed right-0 border border-black rounded-lg bg-white overflow-y-scroll`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detalles</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeProdDetail()}
          ></XMarkIcon>
        </div>
      </div>

      <figure className=" px-6 ">
        <span className="absolute top-15 right-0 bg-green-200 rounded-lg text-black text-md m-2 px-3 py-0.5">
          Unidades disponibles : {context.prodToShow.stock}
        </span>
        <img
          className="w-full h-full rounded-lg"
          src={context.prodToShow.fileUrl}
          alt={context.prodToShow.subType}
        />
      </figure>

      <p className="flex flex-col p-6 ">
        <span className=" font-medium text-2xl mb-3">
          ${context.prodToShow.price}
        </span>

        <span className="font-medium text-md">
          {context.prodToShow.subType} {context.prodToShow.brand}
        </span>
        <span className="font-light text-sm">{context.prodToShow.desc}</span>
      </p>
    </aside>
  )
}

export default ProductDetail
