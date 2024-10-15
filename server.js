//server.js
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')

//load environment variable
dotenv.config()

//initialize express app
const app = express()

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json())

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

filename = ''

// Routes
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const purchaseRoutes = require('./routes/purchaseRoutes')
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/purchase', purchaseRoutes)

// Server listening on port from environment or default 5000
const port = process.env.PORT || 5000
app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))