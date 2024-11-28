import Layout from "../../Components/Layout"

function AboutUs() {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Sobre nosotros
          </h1>
          <hr className="border-gray-500" />
        </div>
        <div className="flex mt-8">
          <div className="w-2/5 pr-4 border border-gray-300 p-4 rounded">
            <img
              src="https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/edp-hat-blue.jpeg?t=2024-11-24T23%3A17%3A06.457Z"
              alt="Enfermos del pádel"
              className="w-full h-auto rounded"
            />
          </div>
          <div className="w-3/5 pl-8 pt-10 ">
            <p className="mb-6 text-justify">
              {" "}
              En <i className="font-bold">Enfermos del Pádel</i>, vivimos y
              respiramos este deporte.
            </p>
            <p className=" text-justify">
              Fundada en junio de 2020 por dos socios apasionados, surgimos con
              una misión clara:
            </p>{" "}
            <p className="mb-6 text-justify">
              <i className="font-light">
                &quot;brindar accesorios, indumentaria y paletas de pádel con
                calidad, confianza y, sobre todo, cercanía&quot;.
              </i>
            </p>
            <p className="mb-6 text-justify">
              Creemos que cada cliente merece un trato amigable y un
              asesoramiento profesional, porque entendemos sus necesidades como
              nadie.
            </p>
            <p className="mb-6 text-justify">
              Nuestro equipo, liderado por Santiago Farías, está compuesto por
              verdaderos expertos del pádel.
            </p>
            <p className="mb-6 text-justify">
              Nos dedicamos a jugadores, clubes y amateurs, ofreciendo no solo
              productos de primera, sino también una experiencia personalizada.
            </p>
            <p className="mb-12 text-justify">
              Con una visión de crecer sin perder nuestra esencia, seguimos
              apostando por el buen trato, la calidad y esa conexión especial
              con cada cliente. ¡Estamos aquí para acompañarte en cada punto y
              en cada victoria!
            </p>
            <img className="h-16 float-right" src="/logo.svg" alt="" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export { AboutUs }
