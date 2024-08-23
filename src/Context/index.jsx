import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  //Product Detail - Open/Close Products
  const [isProdDetailOpen, setIsProdDetailOpen] = useState(false);
  const openProdDetail = () => setIsProdDetailOpen(true);
  const closeProdDetail = () => setIsProdDetailOpen(false);

  //Checkout side menu - Open/Close Products
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  //Product Detail - Show Products
  const [prodToShow, setProdToShow] = useState({});

  //Shopping Cart - Add products to cart
  const [cartProds, setCartProds] = useState([]);

  //Shopping Cart - Order
  const [order, setOrder] = useState([]);

  //Get Products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  //Search Products
  const [searchByTitle, setSearchByTitle] = useState(null);

  //Get only unique categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchByTitle)
      setFilteredItems(filteredItemsByTitle(items, searchByTitle));
  }, [items, searchByTitle]);

  //filter by catetories
  useEffect(() => {
    if (items) {
      const categories = items.map((item) => item.category);
      const uniqueCategories = [...new Set(categories)];
      setCategories(uniqueCategories);
    }
  }, [items]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProdDetail,
        closeProdDetail,
        isProdDetailOpen,
        prodToShow,
        setProdToShow,
        cartProds,
        setCartProds,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        categories,
        setCategories,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

ShoppingCartProvider.propTypes = { children: PropTypes.node.isRequired };
