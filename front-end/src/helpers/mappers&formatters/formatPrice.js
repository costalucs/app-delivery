export default function formatPrice(totalValue) {
  return Number(totalValue).toFixed(2).replace(/\./, ',');
}
