import { useContext } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { ShoppingCartContext } from "../../Context"
import "./styles.css"

const ProductDetail = () => {
  const { prodToShow, isProdDetailOpen, closeProdDetail } =
    useContext(ShoppingCartContext)

  return (
    <aside
      className={`${
        isProdDetailOpen ? "flex" : "hidden"
      } product-detail flex-col fixed right-0 border border-black rounded-lg bg-white overflow-y-scroll`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detalles</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => closeProdDetail()}
          ></XMarkIcon>
        </div>
      </div>

      <figure className=" px-6 ">
        <span
          className={`absolute top-15 right-0 ${
            prodToShow.stock <= 0 ? "bg-red-200" : "bg-green-200"
          } rounded-lg text-black text-md m-2 px-3 py-0.5`}
        >
          Unidades disponibles : {prodToShow.stock}
        </span>
        <img
          className="w-full h-full rounded-lg"
          src={prodToShow.image}
          alt={prodToShow.sub_type}
        />
      </figure>

      <div className="flex flex-col p-6 ">
        <span className=" font-medium text-2xl mb-3 dark:text-blue-500">
          {prodToShow.price?.toLocaleString("es-AR", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "ARS",
            useGrouping: true,
          })}
        </span>

        <span className="font-medium text-lg">Especificaciones</span>
        <div className="mt-2 ">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Marca
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {prodToShow.brand}
              </dd>
            </div>
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Modelo
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {prodToShow.model}
              </dd>
            </div>
            {prodToShow.type !== "Paleta" && (
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Color
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {prodToShow.color?.map((color) => (
                    <span
                      key={color}
                      className="inline-block bg-blue-100 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {color}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Genero
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {prodToShow.gender}
              </dd>
            </div>
            {(prodToShow.type === "Indumentaria" ||
              prodToShow.type === "Zapatillas") && (
              <>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Talles
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {prodToShow.size?.map((size) => (
                      <span
                        key={size}
                        className="inline-block bg-blue-100 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        {size}
                      </span>
                    ))}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </div>

        <span className="mt-2 font-light text-sm">
          <span className="font-medium text-lg">Descripción</span>
          <div className="flex gap-2 mt-2">{prodToShow.description}</div>
        </span>
      </div>
    </aside>
  )
}

export default ProductDetail
