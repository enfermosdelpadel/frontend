import { XMarkIcon } from "@heroicons/react/24/solid"

const OrderCard = (props) => {
  const { id, title, imageURL, price, handleDelete } = props
  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = (
      <XMarkIcon
        onClick={() => handleDelete(id)}
        className="h-6 w-6 text-black cursor-pointer"
      ></XMarkIcon>
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
