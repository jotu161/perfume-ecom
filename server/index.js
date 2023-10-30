const express = require("express");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/User");
const Contactuser = require("./DB/Contact");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors()); 
app.use(bodyParser.json());


let userTemp=null;

app.post("/signup", async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    let newUser = new User({ username, mail, password });
    await newUser.save();
    newUser = newUser.toObject();
    delete newUser.password;
    userTemp=newUser;
    console.log(newUser)
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.mail) {
    const user = await User.findOne(req.body).select("-password");
    console.log(user);
    
    if (user) {
      userTemp=user;
      res.send(user);
    } else {
      res.send({ result: "NO user Found !" });
    }
  }
  else{
    res.send({ result: "NO user Found !" });
  }
});

app.post("/cartupdate",async(req,res)=>{
  console.log(req.body.cart)
  await User.updateOne({username:userTemp.username},req.body)
})


app.post("/contact", async (req, res) => {
  try {
    const { contact_name, contact_email, contact_message } = req.body;
    let contactdata = new Contactuser({ contact_name,contact_email,contact_message});
    await contactdata.save();
  } catch (error) {
    console.log(error);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
