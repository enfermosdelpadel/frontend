import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import "./styles.css";

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const renderimg =
    "https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/";

  return (
    <aside
      className={`${
        context.isProdDetailOpen ? "flex" : "hidden"
      } product-detail flex-col fixed right-0 border border-black rounded-lg bg-white overflow-y-scroll`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeProdDetail()}
          ></XMarkIcon>
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={`${renderimg}/${context.prodToShow.fileUrl}`}
          alt={context.prodToShow.subType}
        />
      </figure>
      <p className="flex flex-col p-6 ">
        <span className="font-medium text-2xl mb-2">
          ${context.prodToShow.price}
        </span>
        <span className="font-medium text-md">
          {context.prodToShow.subType} {context.prodToShow.brand}
        </span>
        <span className="font-light text-sm">{context.prodToShow.desc}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
