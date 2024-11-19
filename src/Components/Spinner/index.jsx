import SyncLoader from "react-spinners/SyncLoader"

function Spinner({ loading }) {
  return (
    <div className="sweet-loading">
      <SyncLoader color="rgba(5, 4, 4, 1)" loading={loading} width={20} />
    </div>
  )
}

export default Spinner
