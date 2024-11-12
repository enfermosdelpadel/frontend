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

function Home() {
  const {
    searchByTitle,
    filteredItems,
    setSearchByTitle,
    items,
    openModal,
    modalCheckout,
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
      <div className="flex items-center justify-center relative w-80 mb-4"></div>
      <input
        id="search"
        className="mt-8 w-80 border-2 border-slate-200 p-2 rounded-2xl sle focus:outline-none select-none"
        type="text"
        placeholder="Buscar productos"
        onChange={(event) => setSearchByTitle(event.target.value)}
      />
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
    </Layout>
  )
}

export default Home
