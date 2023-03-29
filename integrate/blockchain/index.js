const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const walletRouter = require('./controller/wallet')
const getMongoUrl = require('./utils/get-mongo-url')
// const path = require('path')

require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(getMongoUrl(),
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())
if (process.env.NODE_ENV === 'production')
// app.get('/*',(req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/build/public/index.html'))
//   })

{ app.use('/api/wallet', walletRouter) }

const PORT = process.env.API_PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
