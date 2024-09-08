import { TrashIcon } from "@heroicons/react/24/solid"

const OrderCard = (props) => {
  const { id, title, imageURL, price, handleDelete } = props
  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = (
      <TrashIcon
        onClick={() => handleDelete(id)}
        className="h-6 w-6 text-black cursor-pointer text-red-600"
      ></TrashIcon>
    )
  }
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full rounded-lg object-cover"
            src={imageURL}
            alt={title}
          />
        </figure>
        <div className="text-sm font-light">{title}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-lg font-medium">{price}</div>
        {renderXMarkIcon}
      </div>
    </div>
  )
}

export default OrderCard
