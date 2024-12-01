import { useRoutes, BrowserRouter, Navigate } from "react-router-dom"
import "./App.css"
import Navbar from "../../Components/Navbar"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import Home from "../Home"
import MyAccount from "../MyAccount"
import { ShoppingCartProvider } from "../../Context"
import MyOrder from "../MyOrder"
import MyOrders from "../MyOrders"
import SignIn from "../SignIn"
import NotFound from "../NotFound"
import CheckoutSideMenu from "../../Components/CheckoutSideMenu"
import { AboutUs } from "../AboutUs"

const AppRoutes = () => {
  const { isUserLogin } = useContext(ShoppingCartContext)

  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/:type", element: <Home /> },
    {
      path: "/my-account",
      element: isUserLogin ? <MyAccount /> : <Navigate to="/" />,
    },
    {
      path: "/my-order",
      element: isUserLogin ? <MyOrder /> : <Navigate to="/" />,
    },
    {
      path: "/my-orders",
      element: isUserLogin ? <MyOrders /> : <Navigate to="/" />,
    },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/sign-in",
      element: isUserLogin ? <Navigate to="/" /> : <SignIn />,
    },

    { path: "/about-us", element: <AboutUs /> },
  ])
  return routes
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App
