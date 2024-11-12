import { TrashIcon } from "@heroicons/react/24/solid"

const OrderCard = (props) => {
  const { id, title, imageURL, price, handleDelete, size, quantity, type } =
    props
  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = (
      <TrashIcon
        onClick={() => handleDelete(id)}
        className="h-6 w-6 text-black cursor-pointer text-red-600"
      ></TrashIcon>
    )
  }

  let renderSize = () => {
    if (type?.includes("Indumentaria") || type?.includes("Zapatillas")) {
      return (
        <div>
          <label className="text-sm font-light mr-2" htmlFor="size">
            Talle:
          </label>
          <span className="text-sm font-light">{size}</span>
        </div>
      )
    }
  }

  return (
    <div className="flex justify-between items-center mb-3 border-t border-black-500 mt-3 pt-3">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={imageURL}
            alt={title}
          />
        </figure>
        <div className="flex flex-col ">
          <div className="text-sm font-light">{title}</div>
          <div>
            {renderSize()}
            <div>
              <label className="text-sm font-medium mr-2" htmlFor="quantity">
                Cantidad:
              </label>
              <span className="text-sm font-light">{quantity}</span>
            </div>
            {handleDelete}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm text-medium">{price}</div>
        {renderXMarkIcon}
      </div>
    </div>
  )
}

export default OrderCard
