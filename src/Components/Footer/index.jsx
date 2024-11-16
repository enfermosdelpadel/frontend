function Footer() {
  return (
    <footer className="bg-gray-200 h-24 flex items-center justify-center w-full">
      <p className="text-gray-600">
        Copyright {new Date().getFullYear()} -{" "}
        <a className="text-gray-800">Enfermos del Padel</a>
      </p>
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
    </footer>
  )
}
export { Footer }
