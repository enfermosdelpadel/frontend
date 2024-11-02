import PropTypes from "prop-types"
import { createContext, useState, useEffect } from "react"
import { supabase } from "../supabase/client"

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
  const [count, setCount] = useState(0)

  //Product Detail - Open/Close Products
  const [isProdDetailOpen, setIsProdDetailOpen] = useState(false)
  const openProdDetail = () => setIsProdDetailOpen(true)
  const closeProdDetail = () => setIsProdDetailOpen(false)

  //Checkout side menu - Open/Close Products
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  //Product Detail - Show Products
  const [prodToShow, setProdToShow] = useState({})

  //Shopping Cart - Add products to cart
  const [cartProds, setCartProds] = useState([])

  //Shopping Cart - Order
  const [order, setOrder] = useState([])

  //Get Products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  //Search Products
  const [searchByTitle, setSearchByTitle] = useState(null)

  //Get only unique types
  const [types, setTypes] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.rpc("get_product_stock")
      if (error) {
        throw error
      } else {
        const stockProducts = data.reduce((acc, item) => {
          if (!acc[item.product_id]) {
            acc[item.product_id] = {
              id: item.product_id,
              color: [],
              size: [],
            }
          }
          acc[item.product_id].stock = item.stock
          acc[item.product_id].price = item.price
          acc[item.product_id].sub_type = item.sub_type
          acc[item.product_id].type = item.type
          acc[item.product_id].model = item.model
          acc[item.product_id].brand = item.brand
          acc[item.product_id].gender = item.gender
          acc[item.product_id].image = item.image
          acc[item.product_id].description = item.description

          const colorIndex = acc[item.product_id].color.findIndex(
            (color) => color === item.color
          )
          if (colorIndex === -1) {
            acc[item.product_id].color.push(item.color)
          }

          const sizeIndex = acc[item.product_id].size.findIndex(
            (size) => size === item.size
          )
          if (sizeIndex === -1) {
            acc[item.product_id].size.push(item.size)
          }

          return acc
        }, {})
        setItems(Object.values(stockProducts))
      }
    }
    fetchProducts()
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(
      (item) =>
        item.sub_type?.toLowerCase().includes(searchByTitle.toLowerCase()) ||
        item.model?.toLowerCase().includes(searchByTitle.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchByTitle.toLowerCase())
    )
  }

  useEffect(() => {
    if (searchByTitle)
      setFilteredItems(filteredItemsByTitle(items, searchByTitle))
  }, [items, searchByTitle])

  //filter by catetories
  useEffect(() => {
    if (items) {
      const types = items.map((item) => item.type)
      const uniquetypes = [...new Set(types)]
      setTypes(uniquetypes)
    }
  }, [items])

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
        types,
        setTypes,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = { children: PropTypes.node.isRequired }
