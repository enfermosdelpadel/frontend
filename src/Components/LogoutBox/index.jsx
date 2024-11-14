import { useNavigate } from "react-router-dom"
function LogoutBox({ logout, setLogoutModal }) {
  const navigate = useNavigate()
  const logoutSession = () => {
    logout().then(() => {
      navigate("/")
    })
    setLogoutModal(false)
  }
  return (
    <div
      role="alert"
      className="rounded-xl border border-gray-100 bg-white p-4"
    >
      <div className="flex items-start gap-4">
        <div className="flex-center flex-shrink-0">
          <strong className="block font-medium text-gray-900">
            ¿Esta seguro que desea salir?{" "}
          </strong>

          <div className="mt-4 pl-9 flex gap-2">
            <a
              onClick={() => logoutSession()}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer"
            >
              <span className="text-sm"> Si </span>
            </a>

            <a className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer">
              <span onClick={() => setLogoutModal(false)} className="text-sm">
                Volver
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export { LogoutBox }
