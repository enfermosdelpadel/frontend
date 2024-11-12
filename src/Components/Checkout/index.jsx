function Checkout() {
  return (
    <section className="rounded-3xl shadow-2xl">
      <div className="bg-white p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
          Tu orden se ha realizado con éxito
        </p>

        <h2 className="mt-6 text-3xl font-bold">
          Gracias por tu compra, estamos preparándola!
        </h2>
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
