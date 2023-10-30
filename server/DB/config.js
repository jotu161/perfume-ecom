const mongoose=require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/e-commerce")
.then(()=>{
    console.log("Connection Done With Database")
}).catch(()=>{
    console.log("Connection Faild With Database")
})