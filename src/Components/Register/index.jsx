import { useForm } from "react-hook-form"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context/index"
import ReactModal from "react-modal"
import { RegisterBox } from "../RegisterBox"

function Register({ setShowRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()
  const { addUser, registerModal, setRegisterModal } =
    useContext(ShoppingCartContext)
  const onSubmit = (data) => {
    addUser(data)
    setRegisterModal(true)
  }
  return (
    <section className="bg-white mt-8 rounded-2xl">
      <div className="flex flex-col lg:grid lg:min-h-lg lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/edp-hat.jpeg?t=2024-11-14T19%3A48%3A37.607Z"
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
            <h2 className="text-2xl font-medium text-gray-900">
              Ingresa tus datos para completar el registro
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombres{" "}
                  {errors.first_name && (
                    <span className="span-error">
                      {errors.first_name.message}
                    </span>
                  )}
                </label>

                <input
                  {...register("first_name", {
                    required: "Campo requerido",
                    minLength: 3,
                    pattern: {
                      value: /^\S+/,
                      message: "Ingrese un valor valido",
                    },
                  })}
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="input_signin"
                  autoComplete="off"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido{" "}
                  {errors.last_name && (
                    <span className="span-error">
                      {errors.last_name.message}
                    </span>
                  )}
                </label>

                <input
                  {...register("last_name", {
                    required: "Campo requerido",
                    minLength: 3,
                    pattern: {
                      value: /^\S+/,
                      message: "Ingrese un valor valido",
                    },
                  })}
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="input_signin"
                  autoComplete="off"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico {""}
                  {errors.email && (
                    <span className="span-error">Campo requerido</span>
                  )}
                </label>

                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  name="email"
                  className="input_signin"
                  autoComplete="off"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña{" "}
                  {errors.password && (
                    <span className="span-error">
                      {errors.password.message}
                    </span>
                  )}
                </label>

                <input
                  {...register("password", {
                    required: "Campo requerido",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  className="input_signin"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar Contraseña{" "}
                  {errors.password_confirmation && (
                    <span className="span-error">
                      {errors.password_confirmation.message}
                    </span>
                  )}
                </label>

                <input
                  {...register("password_confirmation", {
                    required: true,
                    validate: (value) => {
                      if (value == watch("password")) {
                        return true
                      } else {
                        return "Las contraseñas no coinciden"
                      }
                    },
                  })}
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="input_signin"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Crear cuenta
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Ya tienes una cuenta?{" "}
                  <a
                    onClick={() => setShowRegister(true)}
                    className="text-gray-700 underline cursor-pointer"
                  >
                    Identificate
                  </a>
                  .
                </p>
              </div>
            </form>
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
          </div>
        </main>
      </div>
      <ReactModal className="modal" isOpen={registerModal}>
        <RegisterBox
          setRegisterModal={setRegisterModal}
          setShowRegister={setShowRegister}
        />
      </ReactModal>
    </section>
  )
}
export { Register }
