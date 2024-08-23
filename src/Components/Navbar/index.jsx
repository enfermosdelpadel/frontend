import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const navLinksRight = [
  { to: '/my-orders', text: 'My orders' },
  { to: '/my-account', text: 'My Account' },
  { to: '/sign-in', text: 'Sign in' },
]

function NavBar() {

  const context = useContext(ShoppingCartContext);
  
  // Get the categories name from the context
  const categories = context.categories

  // Create an array of objects with the categories name.
  // That array held the data for the left side of the navbar links.
  const navLinksLeft = categories.map((category) => {
      return { to: `/${category}`, text: category }
  })

  const activeStyle = 'underline underline-offset-4'

  const handleShowCheckoutSideMenu = () => {
      if (context.isCheckoutSideMenuOpen) {
          context.closeCheckoutSideMenu(false)
      } else {
          context.openCheckoutSideMenu()
      }
  }

  return (
      <>
      <nav className='flex justify-between items-center bg-white fixed top-0 z-10 w-full py-5 px-8 text-sm font-light'>
          <ul className='flex items-center gap-3'>
              <li className='font-semibold text-lg'>
                  <NavLink to='/'>
                      Tute-Shop
                  </NavLink>
              </li> 

              {navLinksLeft.map((link) => (
                  <li key={link.to}>
                      <NavLink 
                          to={link.to}
                          className={({ isActive }) => isActive ? activeStyle : 'undefined'}
                      >
                          {link.text}
                      </NavLink>
                  </li>
              ))}

          </ul>
          <ul className='flex items-center gap-3'>

              <li className='text-black/60'>
                  tute@shop.com
              </li>

              {navLinksRight.map((link) => (
                  <li key={link.to}>
                      <NavLink 
                          to={link.to}
                          className={({ isActive }) => isActive ? activeStyle : 'undefined'}
                      >
                          {link.text}
                      </NavLink>
                  </li>
              ))}

              <li className='flex gap-1'>
                  <ShoppingCartIcon 
                      className='h-5 w-5 cursor-pointer' 
                      onClick={handleShowCheckoutSideMenu}    
                  />
                  <div>{context.cartProds.length}</div> 
              </li>
          </ul>
      </nav>
      </>
  )
} 

export default NavBar;
