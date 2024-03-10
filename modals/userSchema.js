const mongoose=require('mongoose')

// const url='mongodb://localhost:27017/store'
// const connect=mongoose.connect(url)
// connect.then(()=>{
//     console.log('db user connected');
// })
const userSchema=new mongoose.Schema({

    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }


})
module.exports=mongoose.model('users',userSchema)
