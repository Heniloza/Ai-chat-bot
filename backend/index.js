import express, { text } from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import chats from './models/chats.js'
import userChat from './models/userChat.js'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const port = process.env.PORT || 3000;
const app = express();

//Middlewares
dotenv.config();
app.use(cors({ origin:process.env.CLIENT_URL,credentials:true}));
app.use(express.json(0))
//Database connection
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("CONNECTED TO MONGODB");
        
    } catch (error) {
        console.log(error);
        
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  });


  //Routes
app.get("/api/upload",(req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

// app.get("/api/test",ClerkExpressRequireAuth({}),(req,res)=>{
//     const userId = req.auth.userId    
//     console.log("Success");
//     res.send("Success.")
// })

app.post("/api/chats",ClerkExpressRequireAuth({}),async (req,res)=>{
    const userId = req.auth.userId  
    const {text}= req.body;
    //CREATING A USER
    try {
        const newChat = new chats({
            userId,
            history:[{role:"user",parts:[{text}]}]
        })

        const saveChat = await newChat.save();
        console.log("CHAT CREATED SUCCESSFULLY.");
        

        //CHECKING IF USER CHAT NOT EXIST THEN CREATING A NEW CHAT
        const userChats = await userChat.find({userId})

        if(!userChats.length){
            const newUserChats = new userChat({
                userId,
                chats:[
                    {
                        _id:saveChat._id,
                        title:text.substring(0,40)
                        
                    }
                ]
            })
            await newUserChats.save()
            console.log("New chat created.");
            
        }else{
            //IF EXIST PUSH THEM INTO EXISTING ARRAY OF CHATS
            await userChat.updateOne({userId},{
                $push:{
                    chats:{
                        _id:saveChat._id,
                        title:text.substring(0,40)
                    }
                }
            })
            res.status(201).send(newChat._id);
            console.log("Chat is Existed So push it into existing ARRAY.");
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error in creating a chat.")
        
    }    
})

app.get("/api/userchats",ClerkExpressRequireAuth(),async(req,res)=>{
    const userId = req.auth.userId;
    try {
        const userChats = await userChat.find({userId})
        res.status(200).send(userChats[0].chats)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error in fetching chats.")
    }
})


app.get("/api/chats/:id",ClerkExpressRequireAuth(),async(req,res)=>{
    const userId = req.auth.userId;
    try {
        const chat = await chats.findOne({_id:req.params.id,userId})
        res.status(200).send(chat)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error in fetching chat!")
    }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
  })
app.put("/api/chats/:id",ClerkExpressRequireAuth(),async(req,res)=>{
    const userId = req.auth.userId;
    const {question,answer,img} = req.body;
    const newItems = [
        ...(question?{role:"user",parts:[{text:question}],...(img && {img})}:[]),
        {role:"model",parts:[{text:answer}]}
    ]
    try {
        const updtedChat = await chats.updateOne({_id:req.params.id,userId},{
            $push:{
                history:{
                    $each:newItems,
                }
            }
        })
        res.status(200).send(updtedChat);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding Conversation.")
    }
})

app.listen(port,()=> {
    connectDb();
    console.log("SERVER STARTED SUCCESSFULLY.")
})