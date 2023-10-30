const mongoose=require("mongoose")

const contactSchema = new mongoose.Schema({
    contact_name:String,
    contact_email:String,
    contact_message:String
});

module.exports = mongoose.model("contact",contactSchema);