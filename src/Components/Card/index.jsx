import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const Card = (data) => {
  const context = useContext(ShoppingCartContext);
  const showProduct = (productDetail) => {
    context.openProdDetail();
    context.setProdToShow(productDetail);
  };

  const addProdToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProds([...context.cartProds, productData]);
    context.openCheckoutSideMenu();
    context.closeProdDetail();
  };
  const renderIcon = (id) => {
    const isInCart =
      context.cartProds.filter((product) => product.id == id).length > 0;
    if (isInCart) {
      return (
        <button className="absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full m-2 p-1 bg-green-600">
          <CheckIcon className="size-6 text-black" />
        </button>
      );
    } else {
      return (
        <button
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProdToCart(event, data.data)}
        >
          <PlusIcon className="size-6 text-black" />
        </button>
      );
    }
  };
  return (
    <div
      className="bg-white backdrop-blur border-white-30 shadow-md cursor-pointer w-56 h-72 flex flex-col justify-center rounded-xl select-none"
      onClick={() => showProduct(data.data)}
    >
      <figure className="relative shrink-0 overflow-hidden h-4/5 mb-4  w-full rounded-3xl">
        <span className="absolute bottom-0 left-0 bg-gray-200 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {/* El ? después de category ayuda a que renderice de igual forma el sitio */}
          {data.data.category}
        </span>
        <img
          className="w-full h-full object-contain rounded-lg"
          src={data.data.image}
          alt={data.data.title}
        />
        {renderIcon(data.data.id)}
      </figure>
      <p className="flex justify-between items-center px-4">
        <span className="text-sm font-light truncate">{data.data.title}</span>
        <span className="text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
