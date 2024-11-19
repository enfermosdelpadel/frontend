// import { XMarkIcon } from "@heroicons/react/24/outline"
function Checkout() {
  return (
    <section className="rounded-3xl shadow-2xl">
      <div className="bg-white p-8 text-center sm:p-12">
        {/* <div className="flex justify-end">
          <button
            onClick={() => handleCheckout()}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div> */}
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
          Tu orden se ha realizado con éxito
        </p>
        <h2 className="mt-6 text-3xl font-bold mb-5">Gracias por tu compra!</h2>
        <span className="mt-2 block text-lg">
          Pronto recibirás un correo de confirmación, con las instrucciones de
          como realizar el pago.
        </span>
        <div className="mt-4">
          <span className="mt-2 block text-lg ">
            No olvides completar tu{" "}
            <a className="text-red-600 font-bold" href="my-account">
              perfil
            </a>{" "}
            para recibir tu pedido!{" "}
          </span>
          <span className="mt-2 block text-lg ">
            <a className="mt-4 pr-2">Puedes seguir el estado de tu compra en</a>
            <a className="text-blue-600 font-bold" href="my-orders">
              Mis Órdenes
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}

export { Checkout }
