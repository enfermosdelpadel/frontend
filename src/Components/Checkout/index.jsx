import { XMarkIcon } from "@heroicons/react/24/outline"
function Checkout({ setModalCheckout }) {
  return (
    <section className="rounded-3xl shadow-2xl">
      <div className="bg-white p-8 text-center sm:p-12">
        <div className="flex justify-end">
          <button
            onClick={() => setModalCheckout(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
          Tu orden se ha realizado con éxito
        </p>
        <h2 className="mt-6 text-3xl font-bold">
          Gracias por tu compra, estamos preparándola!
        </h2>
        <span className="mt-2 block text-lg">
          Pronto recibirás un correo de confirmación, con las instrucciones de
          como realizar el pago.
        </span>
        <span className="mt-2 block text-lg ">
          No olvides completar tu{" "}
          <a className="text-blue-600 font-bold" href="my-account">
            perfil
          </a>{" "}
          para recibir tu pedido!{" "}
        </span>
        <p className="mt-6">Puedes seguir el estado de tu compra en:</p>
        <a
          className="mt-2 inline-block w-full rounded-full bg-blue-600 py-4 text-sm font-bold text-white shadow-xl w-1/2 h-12 hover:bg-blue-700"
          href="my-orders"
        >
          Mis órdenes
        </a>
      </div>
    </section>
  )
}

export { Checkout }
