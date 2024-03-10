const mongoose=require('mongoose')

// const url='mongodb://localhost:27017/store'
// const connect=mongoose.connect(url)
// connect.then(()=>{
//     console.log('db product connected');
// })
const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }


})
module.exports=mongoose.model('products',productSchema)
