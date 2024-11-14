import {
  ShoppingCartIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/solid"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import ReactModal from "react-modal"
import { LogoutBox } from "../LogoutBox"

function NavBar() {
  const {
    types,
    isCheckoutSideMenuOpen,
    closeCheckoutSideMenu,
    openCheckoutSideMenu,
    cartProds,
    isUserLogin,
    user,
    logout,
    setLogoutModal,
    logoutModal,
  } = useContext(ShoppingCartContext)

  const navLinksRight = isUserLogin
    ? [
        { to: "/my-orders", text: "Mis Órdenes" },
        { to: "/my-account", text: "Mi cuenta" },
      ]
    : [{ to: "/sign-in", text: "Identificase" }]

  // Create an array of objects with the types name.
  // That array held the data for the left side of the navbar links.
  const navLinksLeft = types.map((type) => {
    return { to: `/${type}`, text: type }
  })

  const activeStyle = "underline underline-offset-4"

  const handleShowCheckoutSideMenu = () => {
    if (isCheckoutSideMenuOpen) {
      closeCheckoutSideMenu(false)
    } else {
      openCheckoutSideMenu()
    }
  }

  const renderLogoutIcon = () => {
    if (isUserLogin) {
      return (
        <ArrowRightStartOnRectangleIcon
          onClick={() => setLogoutModal(true)}
          className="h-6 w-6"
        />
      )
    }
  }

  return (
    <>
      <ReactModal className="modal" isOpen={logoutModal}>
        <LogoutBox logout={logout} setLogoutModal={setLogoutModal} />
      </ReactModal>
      <nav className="flex justify-between items-center bg-white fixed top-0 z-10 w-full py-5 px-8 text-sm font-light">
        <ul className="flex items-center gap-3">
          <li className="font-semibold text-lg">
            <NavLink to="/">
              <picture>
                <img className="h-10 max-w-full" src="/EDP.png" alt="logo" />
              </picture>
            </NavLink>
          </li>

          {navLinksLeft.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? activeStyle : "undefined"
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex items-center gap-3">
          <li className="gap -1 flex items-center text-black">
            <UserIcon className="h-6 w-6 mr-1" />
            {user && user.email ? user.email : ""}
          </li>

          {navLinksRight.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? activeStyle : "undefined"
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}

          <li className="flex gap-1">
            <ShoppingCartIcon
              className="h-5 w-5 cursor-pointer"
              onClick={handleShowCheckoutSideMenu}
            />
            <div>{cartProds.length}</div>
          </li>
          <li className="flex gap-1 cursor-pointer">{renderLogoutIcon()}</li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar
