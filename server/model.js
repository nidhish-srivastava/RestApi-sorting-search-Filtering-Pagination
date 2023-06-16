const mongoose = require('mongoose')

const random = new mongoose.Schema({

    /*Only those properties will be added from json,that match the Model
     Ex : featured is made in model but in json file,it is feature, so the data from json wont be used */
    price:{
        type:Number,
    },
    name:{
        type:String
    },
    feature:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,         
    }

    
})


module.exports = mongoose.model('Random',random)

