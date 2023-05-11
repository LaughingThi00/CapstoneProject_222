const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cron = require('node-cron')
const walletRouter = require('./controller/wallet')
const transferRouter = require('./controller/transfer')
const buyCrypto = require('./controller/buy_crypto')
const getMongoUrl = require('./utils/get-mongo-url');
const listenDeposit = require('./jobs/deposit')
// const path = require('path')

require('dotenv').config()

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.r2ufcpu.mongodb.net/?retryWrites=true&w=majority`
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

// cron.schedule("*/1 * * * * *", listenDeposit)
listenDeposit();

const app = express()
app.use(express.json())
app.use(cors())
if(process.env.NODE_ENV === 'production') 
// app.get('/*',(req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/build/public/index.html'))
//   })

app.use('/api/wallet', walletRouter)
app.use('/api/transaction', transferRouter)
app.use('/api/buy', buyCrypto)

const PORT = process.env.API_PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
