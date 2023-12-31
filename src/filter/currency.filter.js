const filter = {
  currencyFilter(value, currency = 'UAH') {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency
    }).format(value)
  }
}
export default filter