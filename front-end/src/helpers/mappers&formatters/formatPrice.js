export default function formatPrice(totalValue) {
  return totalValue.toFixed(2).replace(/\./, ',');
}
