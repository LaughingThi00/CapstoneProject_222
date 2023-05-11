const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


// const authRouter = require('./controller/auth')
const userRouter = require('./controller/user')
const transactionRouter = require('./controller/transaction')
const systemWalletRouter = require('./controller/systemwallet')
const merchantRouter = require('./controller/merchant')
const endpointRouter = require('./controller/endpoint')
// const path = require('path')

require('dotenv').config()

const connectDB = async () => {
  try {
    await mongoose.connect(
     `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}.sfqztyc.mongodb.net/?retryWrites=true&w=majority`
    ,{
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

// if (process.env.NODE_ENV === 'production')
// app.get('/*',(req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/build/public/index.html'))
//   })
// app.use('/api/auth', authRouter)
 
app.use('/api/user', userRouter)
app.use('/api/transaction', transactionRouter)
app.use('/api/systemwallet', systemWalletRouter)
app.use('/api/merchant', merchantRouter)
app.use('/endpoint', endpointRouter)



const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
