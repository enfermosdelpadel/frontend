function Footer() {
  return (
    <footer className="bg-gray-200 h-24 flex items-center gap-4 justify-center w-full">
      <p className="text-gray-600">
        Copyright {new Date().getFullYear()} -{" "}
        <a className="text-gray-800">Enfermos del Padel</a>
      </p>
      <div className="flex items-center">
        <a
          href="https://www.instagram.com/enfermosdelpadel/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png"
            alt="Instagram"
            className="h-6 w-6 mx-2"
          />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=5491166444222&text=Hola!%20Quiero%20hacer%20una%20consulta."
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
            alt="WhatsApp"
            className="h-8 w-8 mx-2"
          />
        </a>
      </div>
      <a href="/about-us">¿Quiénes somos?</a>
    </footer>
  )
}
export { Footer }
