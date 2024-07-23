const express = require("express");
const app = express();
const port = 8079;
const mongoose = require('mongoose');
const path = require("path");

const Chat = require("./models/chat.js");
const { trusted } = require("mongoose");

app.set("views" , path.join( __dirname , "views")); // telling path of views directory to express.js 
app.set("view engine", "ejs");   
app.use(express.urlencoded({extended : true}));
// Public Directory 
app.use(express.static(path.join(__dirname , "public")));
main().then(()=>{
    console.log("Connection Successful.....")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

const methodOverride = require("method-override")
app.use(methodOverride("_method"))


// Index Route (All Chats)
app.get("/chats",  async (req,res)=>{
   let chats = await Chat.find();
  res.render("index.ejs", {chats})
})

// New Route (use to render a form)
app.get("/chats/new", (req,res)=>{
  res.render("new.ejs")
})

app.post("/chats", (req,res)=>{
  let{ from , to, msg } = req.body;
  let newChat = new Chat({
    from : from,
    to : to,
    msg : msg,
    created_at : new Date(),

  });
  newChat.save().then((res)=>{
    console.log("Chat Was Saved")
  }).catch((err)=>{
    console.log(err)
  })
  res.redirect("/chats");
});

// Edit Route 
app.get("/chats/:id/edit", async (req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs" , {chat})


})

// Update Route
app.put("/chats/:id", async (req,res)=>{
  let {id} = req.params;
  let { msg : newMsg} = req.body;
  console.log(newMsg);
  let updatedChat =  await Chat.findByIdAndUpdate(id, { "msg" : newMsg }, 
    {runValidators : true, new : true}
  );
  console.log(updatedChat)
  res.redirect("/chats")
})

// Destroy Route
app.delete("/chats/:id", async (req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id)
  console.log(deletedChat);
  res.redirect("/chats")

})


 






//Note : Id always find in the Parameter of the request(query) or Chat always Find in the body of the request (req.body)


// Last Part
app.get("/" , (req,res)=>{
    res.send("Server Working! ");
})

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
})