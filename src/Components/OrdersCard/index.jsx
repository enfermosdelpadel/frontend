import {
  ChevronRightIcon,
  CalendarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

const OrdersCard = (props) => {
  const { totalPrice, totalProds, datePurchase } = props;

  return (
    <div className="bg-white flex rounded-lg mb-4 justify-between items-center border border-black w-80 p-4">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <CalendarIcon className="h-6 w-6 text-black cursor-pointer" />
            <span className="font-light">{datePurchase}</span>
          </div>
          <div className="flex gap-2">
            <ShoppingCartIcon className="h-6 w-6 text-black cursor-pointer" />
            <span className="font-light">{totalProds} articles </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
