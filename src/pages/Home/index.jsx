import { useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

function Home() {
  const context = useContext(ShoppingCartContext);

  const { category } = useParams();

  const renderView = () => {
    if (context.searchByTitle?.length > 0) {
      if (context.filteredItems?.length > 0) {
        if (!category) {
          return context.filteredItems?.map((item) => (
            <Card key={item.id} data={item} />
          ));
        } else {
          return context.filteredItems?.map((item) => {
            if (item.category === category) {
              return <Card key={item.id} data={item} />;
            }
          });
        }
      } else {
        return (
          <div className="flex items-center justify-center w-full">
            <FaceFrownIcon className="h-8 w-8 text-gray-500 mr-2" />
            <div className="text-gray-500 text-lg">
              We don&apos;t have anything
            </div>
          </div>
        );
      }
    }
    if (category) {
      return context.items?.map((item) => {
        if (item.category === category) {
          return <Card key={item.id} data={item} />;
        }
      });
    } else {
      return context.items?.map((item) => <Card key={item.id} data={item} />);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4"></div>
      <input
        className="mt-8 w-80 border-2 border-slate-200 p-2 rounded-2xl sle focus:outline-none select-none"
        type="text"
        placeholder="search a product"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      {/* The cards renderize depends of items */}
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg p-6">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
