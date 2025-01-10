const axios = require('axios')
const Crypto = require('./models/Crypto')

const fetchCryptoData = async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum']
    const url = 'https://api.coingecko.com/api/v3/simple/price'

    try {
        const response = await axios.get(url, {
            params: {
                ids: coins.join(','),
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_change: 'true',
            },
        })

        const data = response.data
        console.log('Fetched data from API:', data)

        coins.forEach(async coin => {
            try {
                const record = new Crypto({
                    coin,
                    price: data[coin]?.usd,
                    marketCap: data[coin]?.usd_market_cap,
                    change24h: data[coin]?.usd_24h_change,
                })
                await record.save()
                console.log(`Data for ${coin} saved successfully.`)
            } catch (err) {
                console.error(`Error saving data for ${coin}:`, err.message)
            }
        })
    } catch (err) {
        console.error('Error fetching data from CoinGecko:', err.message)
    }
}

module.exports = fetchCryptoData
