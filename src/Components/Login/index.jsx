import { useForm } from "react-hook-form"
import { useContext, useState } from "react"
import { ShoppingCartContext } from "../../Context/index"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { Toaster } from "react-hot-toast"

function Login({ setShowRegister }) {
  const { loginUser } = useContext(ShoppingCartContext)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = (data) => {
    loginUser(data)
  }

  return (
    <>
      <Toaster gutter={30} duration={4000} position="bottom-center" />
      <section className="bg-white mt-8 rounded-2xl">
        <div className="lg:grid lg:min-h-lg lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/edp-court.jpeg?t=2024-11-14T19%3A47%3A54.166Z"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Bienvenidos a EDP
              </h2>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                  href="#"
                >
                  <span className="sr-only">Home</span>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Bienvenidos a EDP
                </h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6">
                  <h3 className="text-2xl font-bold">
                    Ingresa un correo y contraseña
                  </h3>
                </div>
                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electronico{" "}
                    {errors.email && (
                      <span className="text-red-600">Campo requerido</span>
                    )}
                  </label>

                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    name="email"
                    className="input_signin"
                  />
                </div>

                <div className="col-span-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña{" "}
                    {errors.password && (
                      <span className="text-red-600">Campo requerido</span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", { required: true })}
                      id="password"
                      name="password"
                      className="input_signin pr-10"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5" />
                      ) : (
                        <EyeSlashIcon className="w-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Iniciar Sesión
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    No tienes una cuenta?{" "}
                    <a
                      onClick={() => {
                        setShowRegister(false)
                      }}
                      className="text-gray-700 underline cursor-pointer"
                    >
                      Registrate
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  )
}

export { Login }
