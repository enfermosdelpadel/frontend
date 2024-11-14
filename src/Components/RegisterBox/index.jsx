import { useNavigate } from "react-router-dom"

function RegisterBox({ setRegisterModal }) {
  const navigate = useNavigate()
  const registerFlow = () => {
    setRegisterModal(false)
    navigate("/")
  }
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-10"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <span className="font-bold text-2xl mb-2">
            Gracias por registrarte en Enfermos Padel
          </span>
          <p className="mt-2 text-gray-600 pt-2">
            ¡Estás a solo un clic de ser parte de nosotros!
          </p>
          <p className="mt-2 text-gray-600">
            Revisa tu bandeja de entrada, encontrarás un correo para validar tu
            cuenta
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => registerFlow()}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition duration-300 ease-in-out"
            >
              <span className="text-sm font-semibold"> Aceptar </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export { RegisterBox }
