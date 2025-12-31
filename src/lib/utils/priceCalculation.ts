export const priceCalculation = (
  originalPrice: number,
  discount: number
): number => {
  const discountedPrice = originalPrice * (1 - discount / 100)
  return Math.round(discountedPrice / 100) * 100
}
