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
  const [orderID, setOrderID] = useState(null)
  const [orders, setOrders] = useState([""])
  const [orderDetails, setOrderDetails] = useState([])

  //Get Products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  //Search Products
  const [searchByTitle, setSearchByTitle] = useState(null)

  //Get only unique types
  const [types, setTypes] = useState([])

  //Modals
  const [openModal, setOpenModal] = useState(false)
  const [modalCheckout, setModalCheckout] = useState(false)

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

  function generateOrderNumber(customer_id) {
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const hour = ("0" + date.getHours()).slice(-2)

    const orderNumber = `00000-${hour}${year}${month}${day}-${customer_id}`
    return orderNumber
  }

  const createAndSendOrder = async (totalPrice, totalProds, orderDetail) => {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          order_number: generateOrderNumber(1),
          customer_id: 1,
          order_date: new Date(),
          total: totalPrice,
          quantity: totalProds,
          status: "Pendiente",
        },
      ])
      .select("id")

    if (orderError) {
      console.error("Error al crear el pedido:", orderError)
      alert("Error al crear el pedido", orderError)
      return null
    }

    console.log("Nuevo ID de pedido:", orderData[0].id)
    setOrderID(orderData[0].id)

    const { error: detailError, data: detailData } = await supabase
      .from("order_details")
      .upsert(
        orderDetail.map((item) => ({
          order_id: orderData[0].id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          size: item.size,
        })),
        { onConflict: ["order_id", "product_id"] }
      )

    if (detailError) {
      console.error("Error al agregar detalles del pedido:", detailError)
      return null
    }

    console.log("Detalles del pedido agregados:", detailData)
    return detailData
  }

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*,customers(*)")
    if (error) {
      throw error
    }
    setOrders(data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrderDetails = async () => {
    const { data, error } = await supabase
      .from("order_details")
      .select("*, products(*), orders(*)")
    if (error) {
      throw error
    }
    console.log(data)
    setOrderDetails(data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

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
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        types,
        setTypes,
        createAndSendOrder,
        orderID,
        openModal,
        setOpenModal,
        modalCheckout,
        setModalCheckout,
        orders,
        orderDetails,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = { children: PropTypes.node.isRequired }
