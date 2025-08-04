


export const formatPrice = (price: number) => {

  return price.toLocaleString("ru-RU", { currency: "RUB", style: "currency", currencyDisplay: "symbol", maximumFractionDigits: 0 })
}
