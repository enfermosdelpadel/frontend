import { useContext } from "react"
import { useParams } from "react-router-dom"
import Layout from "../../Components/Layout"
import Card from "../../Components/Card"
import ProductDetail from "../../Components/ProductDetail"
import { ShoppingCartContext } from "../../Context"
import { FaceFrownIcon } from "@heroicons/react/24/outline"
import ReactModal from "react-modal"
import { CardConfirm } from "../../Components/CardConfirm"
import { Checkout } from "../../Components/Checkout"
import { Carousel } from "../../Components/Carousel"
import { Footer } from "../../Components/Footer"
import Spinner from "../../Components/Spinner"
import { Toaster } from "react-hot-toast"

function Home() {
  const {
    searchByTitle,
    filteredItems,
    setSearchByTitle,
    items,
    openModal,
    modalCheckout,
    loading,
  } = useContext(ShoppingCartContext)

  const { type } = useParams()

  const renderView = () => {
    if (searchByTitle?.length > 0) {
      if (filteredItems?.length > 0) {
        if (!type) {
          return filteredItems?.map((item) => (
            <Card key={item.id} data={item} />
          ))
        } else {
          return filteredItems?.map((item) => {
            if (item.type === type) {
              return <Card key={item.id} data={item} />
            }
          })
        }
      } else {
        return (
          <div className="flex items-center justify-center w-full">
            <FaceFrownIcon className="h-8 w-8 text-gray-500 mr-2" />
            <div className="text-gray-500 text-lg">
              No hay productos que mostrar
            </div>
          </div>
        )
      }
    }
    if (type) {
      return items?.map((item) => {
        if (item.type === type) {
          return <Card key={item.id} data={item} />
        }
      })
    } else {
      return items?.map((item) => <Card key={item.id} data={item} />)
    }
  }

  return (
    <Layout>
      <Carousel />
      <Toaster gutter={30} duration={4000} position="bottom-center" />
      <div className="flex items-center justify-center relative w-80 mb-4"></div>
      <div className="mt-2 max-w-screen-md w-full h-12 ">
        <input
          id="search"
          className=" border-2 border-slate-200 p-2 rounded-2xl sle focus:outline-none select-none w-full h-full p-2"
          type="text"
          placeholder="Buscar productos"
          onChange={(event) => setSearchByTitle(event.target.value)}
        />
      </div>
      {/* The cards renderize depends of items */}
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg p-6">
        {renderView()}
      </div>
      <ReactModal className="modal" isOpen={openModal}>
        <CardConfirm />
      </ReactModal>
      <ReactModal className="modal" isOpen={modalCheckout}>
        <Checkout />
      </ReactModal>
      <ProductDetail />
      <Spinner loading={loading} />
      <Footer />
    </Layout>
  )
}

export default Home
