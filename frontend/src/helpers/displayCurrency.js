const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : 'ksh',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default displaykshCurrency
