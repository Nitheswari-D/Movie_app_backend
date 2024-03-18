import express from "express";
import { MongoClient } from 'mongodb';
import  {ObjectId} from 'mongodb';
const app=express();
const url="mongodb+srv://Nitheswari-D:nithu@nitheswarid.lhg4uld.mongodb.net/?retryWrites=true&w=majority&appName=NitheswariD";
const client=new MongoClient(url); // has a promise
await client.connect();
console.log("mongoDB connected successfully");
app.use(express.json());
app.get("/",function(request,response){
    response.send("Hello world");
});
app.post("/post",async function(request,response){
    const getPostman=request.body;
    const sendMethod=await client.db("CRUD").collection("data").insertOne(getPostman);
    response.send(sendMethod);
    console.log(getPostman);
})
app.post("/postmany",async function(request,response){
    const getPostman=request.body;
    const sendMethod=await client.db("CRUD").collection("data").insertMany(getPostman);
    response.send(sendMethod);
})
app.get("/get",async function(request,response){
    const getmethod=await client.db("CRUD").collection("data").findOne({});
    response.send(getmethod);
})
app.get("/getmany",async function(request,response){
    const getmethod=await client.db("CRUD").collection("data").find({}).toArray();
    response.send(getmethod);
})
app.get("/getone/:id",async function(request,response){
    const {id}=request.params;
    const getMethod =await client.db("CRUD").collection("data").findOne({_id:new ObjectId(id)});
    response.send(getMethod);
})
//update one, update many
app.put("/update/:id",async function(request,response){
    const {id}=request.params;
    const getPostman=request.body;
    const updatemethod=await client.db("CRUD").collection("data").updateOne({_id:new ObjectId(id)},{$set:getPostman});
    response.send(updatemethod);
})  
app.delete("/delete/:id",async function(request,response){
    const {id}=request.params;
    const deletemethod = await client.db("CRUD").collection("data").deleteOne({_id:new ObjectId(id)});
    response.send(deletemethod);
})
app.listen(4000,()=>{
    console.log("server connected successfully");
})