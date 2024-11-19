import Layout from "../../Components/Layout"

function AboutUs() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">¿Quiénes somos?</h2>
        <p className="mb-8">
          En Enfermos del Pádel, vivimos y respiramos este deporte. Fundada en
          junio de 2020 por dos socios apasionados, surgimos con una misión
          clara: brindar accesorios, indumentaria y paletas de pádel con
          calidad, confianza y, sobre todo, cercanía. Creemos que cada cliente
          merece un trato amigable y un asesoramiento profesional, porque
          entendemos sus necesidades como nadie.
        </p>
        <p className="mb-8">
          Nuestro equipo, liderado por Santiago Farías, está compuesto por
          verdaderos expertos del pádel. Nos dedicamos a jugadores, clubes y
          amateurs, ofreciendo no solo productos de primera, sino también una
          experiencia personalizada.
        </p>
        <p className="mb-12">
          Con una visión de crecer sin perder nuestra esencia, seguimos
          apostando por el buen trato, la calidad y esa conexión especial con
          cada cliente. ¡Estamos aquí para acompañarte en cada punto y en cada
          victoria!
        </p>
      </div>
    </Layout>
  )
}
export { AboutUs }
