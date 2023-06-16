const express = require('express')
const app = express()
app.use(express.json())
const route = require('./route')
require('dotenv').config()
const mongoose = require('mongoose')
const Model = require('./model')
const cors = require('cors')
// This middleware shud be at the top since it is always required as Header(Otherwise Access Controll Cross Origin error will come)
app.use(cors()) 

//* We dont need to export json files
const ProductJSON = require('./product.json')

// app.get('/',(req,res)=>{
//     res.status(200).json({msg:"Running good"})
// })

app.use('/api/route',route)


const start = async() =>{
    try {
         await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB")

        //* To avoid insertion of the same file in the db
         await Model.deleteMany() 

        //* Now adding the json file
        await Model.create(ProductJSON)
        app.listen(4000,()=>{
            console.log(`Listening to port 4000`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
