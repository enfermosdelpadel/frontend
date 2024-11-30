import PropTypes from "prop-types"
import { createContext, useState, useEffect } from "react"
import { supabase } from "../supabase/client"
import { toast } from "react-hot-toast"

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
  const [logoutModal, setLogoutModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)

  //Users
  const [showRegister, setShowRegister] = useState(false)
  const [user, setUser] = useState(null)
  const [isUserLogin, setIsUserLogin] = useState(false)
  const [userProfiles, setUserProfiles] = useState(null)

  //Login
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.rpc("get_product_stock")
      if (error) {
        throw error
      } else {
        const stockProducts = data.reduce((acc, item) => {
          if (!acc[item.prd_id]) {
            acc[item.prd_id] = {
              id: item.prd_id,
              color: [],
              size: [],
            }
          }
          acc[item.prd_id].stock = item.stock
          acc[item.prd_id].price = item.price
          acc[item.prd_id].sub_type = item.sub_type
          acc[item.prd_id].type = item.type
          acc[item.prd_id].model = item.model
          acc[item.prd_id].brand = item.brand
          acc[item.prd_id].gender = item.gender
          acc[item.prd_id].image = item.image
          acc[item.prd_id].description = item.description

          const colorIndex = acc[item.prd_id].color.findIndex(
            (color) => color === item.color
          )
          if (colorIndex === -1) {
            acc[item.prd_id].color.push(item.color)
          }

          const sizeIndex = acc[item.prd_id].size.findIndex(
            (size) => size === item.size
          )
          if (sizeIndex === -1) {
            acc[item.prd_id].size.push(item.size)
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
    if (searchByTitle) {
      setFilteredItems(filteredItemsByTitle(items, searchByTitle))
    }
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
    const minute = ("0" + date.getMinutes()).slice(-2)
    const customer = customer_id.slice(-5)

    const orderNumber = `00000-${hour}${year}${month}${day}${minute}-${customer}`
    return orderNumber
  }

  const createAndSendOrder = async (totalPrice, totalProds, orderDetail) => {
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          order_number: generateOrderNumber(user.id),
          profile_id: user.id,
          order_date: new Date(Date.now() - 3 * 60 * 60 * 1000),
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
      .select("*,profiles(*)")
      .eq("profile_id", user?.id)
    if (error) {
      throw error
    }
    setOrders(data)
  }
  useEffect(() => {
    fetchOrders()
  }, [user])

  const fetchOrderDetails = async () => {
    const { data, error } = await supabase
      .from("order_details")
      .select("*, products(*), orders(*)")
    if (error) {
      throw error
    }
    setOrderDetails(data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  const addUser = async (data) => {
    const result = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })
    try {
      if (result.data.user) {
        const user = result.data.user
        const profile = {
          id: user.id,
          first_name: data.first_name,
          last_name: data.last_name,
          is_customer: true,
        }
        try {
          await supabase
            .from("profiles")
            .upsert(profile, { onConflict: ["id"] })
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = async (data) => {
    const result = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    fetchUser()
    if (result.error) {
      if (result.error.message === "Invalid login credentials") {
        toast.error("Credenciales inválidas")
      } else {
        toast.error(`Error en el Logueo: ${result.error.message}`)
      }
    }
  }

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setIsUserLogin(false)
      } else {
        setIsUserLogin(true)
      }
    })
  }, [])

  //Profile
  const fetchProfiles = async (user) => {
    if (!user) return
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
    if (error) {
      throw error
    } else {
      setUserProfiles(data)
    }
  }

  useEffect(() => {
    fetchProfiles(user)
  }, [user])

  const updateProfile = async (data) => {
    const { error } = await supabase
      .from("profiles")
      .upsert(data, { onConflict: "id" })
    toast.success("Perfil actualizado con exito")
    fetchProfiles(user)
    if (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      setUser(null)
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

  const sendEmail = async (data) => {
    const response = await fetch(
      "https://fastapi-resend.onrender.com/send_mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
  }

  const cancelOrder = async (id) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: "Cancelado" })
      .eq("id", id)
    if (error) {
      throw error
    }
    fetchOrders()
    toast.success("Compra cancelada con exito")
  }

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
        showRegister,
        setShowRegister,
        addUser,
        loginUser,
        isUserLogin,
        user,
        logout,
        setLogoutModal,
        logoutModal,
        userProfiles,
        registerModal,
        setRegisterModal,
        updateProfile,
        loading,
        setLoading,
        sendEmail,
        cancelOrder,
        toast,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = { children: PropTypes.node.isRequired }
