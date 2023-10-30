const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    username:String,
    mail:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    }
});

module.exports = mongoose.model("users",userSchema);