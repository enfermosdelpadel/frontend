/* 

*/
export const totalPrice = (products) => {
  let sum = 0
  products.forEach((product) => (sum += product.price))
  return sum.toLocaleString("es-AR", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "ARS",
    useGrouping: true,
  })
}
