const filters = {
  currencyFilter(value, currency = 'UAH') {
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency
    }).format(value)
  }
}
export default filters