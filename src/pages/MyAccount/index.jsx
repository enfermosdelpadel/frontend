import Layout from "../../Components/Layout"
import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import { useForm } from "react-hook-form"

function MyAccount() {
  const { userProfiles, updateProfile } = useContext(ShoppingCartContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    updateProfile(data)
    console.log(data)
  }

  return (
    <Layout>
      <form
        className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 mt-8 w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <h1 className="font-medium text-xl">Mis datos</h1>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold ">
            Correo electrónico:
          </label>
          <span className="font-medium">{userProfiles?.[0]?.email}</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
            <input
              type="text"
              defaultValue={userProfiles?.[0]?.first_name}
              {...register("first_name")}
              className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Apellido:
            <input
              type="text"
              defaultValue={userProfiles?.[0]?.last_name}
              {...register("last_name")}
              className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Dirección: {""}
            {errors.address && (
              <span className="span-error">Campo es requerido</span>
            )}
            <input
              type="text"
              defaultValue={userProfiles?.[0]?.address}
              {...register("address", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            DNI: {""}
            {errors.dni && (
              <span className="span-error">Campo es requerido</span>
            )}
            <input
              type="text"
              defaultValue={userProfiles?.[0]?.dni}
              {...register("dni", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Actualizar
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default MyAccount
