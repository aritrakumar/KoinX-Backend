require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const schedule = require('node-schedule')
const fetchCryptoData = require('./fetchData')
const Crypto = require('./models/Crypto')

const app = express()
const PORT = process.env.PORT || 3000

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully!'))
    .catch(err =>
        console.error('Error connecting to MongoDB Atlas:', err.message)
    )

// Debug Mongoose connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB Atlas.')
})

mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected.')
})

// Schedule the background job
schedule.scheduleJob('0 */2 * * *', fetchCryptoData)

// Temporarily trigger the function manually for testing
fetchCryptoData()

// API to fetch the latest stats
app.get('/stats', async (req, res) => {
    const { coin } = req.query

    if (!coin) {
        return res
            .status(400)
            .json({ error: 'Coin query parameter is required.' })
    }

    try {
        const latestRecord = await Crypto.findOne({ coin }).sort({
            timestamp: -1,
        })
        if (!latestRecord) {
            return res
                .status(404)
                .json({ error: 'Data not found for the specified coin.' })
        }

        res.json({
            price: latestRecord.price,
            marketCap: latestRecord.marketCap,
            '24hChange': latestRecord.change24h,
        })
    } catch (err) {
        res.status(500).json({
            error: 'Error fetching stats.',
            details: err.message,
        })
    }
})

// API to calculate standard deviation
app.get('/deviation', async (req, res) => {
    const { coin } = req.query

    if (!coin) {
        return res
            .status(400)
            .json({ error: 'Coin query parameter is required.' })
    }

    try {
        const records = await Crypto.find({ coin })
            .sort({ timestamp: -1 })
            .limit(100)
        if (records.length === 0) {
            return res
                .status(404)
                .json({ error: 'Not enough data to calculate deviation.' })
        }

        const prices = records.map(record => record.price)
        const mean =
            prices.reduce((acc, price) => acc + price, 0) / prices.length
        const variance =
            prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
            prices.length
        const deviation = Math.sqrt(variance)

        res.json({ deviation: deviation.toFixed(2) })
    } catch (err) {
        res.status(500).json({
            error: 'Error calculating deviation.',
            details: err.message,
        })
    }
})

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
