import Layout from "../../Components/Layout"
import { Login } from "../../Components/Login"
import { Register } from "../../Components/Register"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"

function SignIn() {
  const { showRegister, setShowRegister } = useContext(ShoppingCartContext)

  return (
    <Layout>
      {!showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login setShowRegister={setShowRegister} />
      )}
    </Layout>
  )
}

export default SignIn
