// init.js Stands For Initialise the Database with Some Sample Data 
const mongoose = require("mongoose");

const Chat = require("./models/chat.js")
main().then(()=>{
    console.log("Connection Successful.....")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats = ([
    {
       from : "Nikhil",
       to : "Kamal",
       msg : "I will Teach you backend development",
       created_at : new Date() 
    },
    {
        from : "Vikas",
       to : "Yash",
       msg :"I will Study Java",
       created_at : new Date() 
    },
    {
        from : "Tanishka",
        to : "Tanya",
        msg : "We will Study Frontend Development",
        created_at : new Date() 
    },
    {
        from : "Tithi",
        to : "Uzma",
        msg : "Let's Study DBMS",
        created_at : new Date() 
    },

])

Chat.insertMany(allChats);



