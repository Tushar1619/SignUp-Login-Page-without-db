import express from 'express';
import { nanoid } from 'nanoid'

const app = express();
app.use(express.json());

let port = 3000 || process.env.PORT ; 
let usersDataBase = [];

app.post("/signup",(req,res)=>{

   let body = req.body;

   if(!body.firstName || !body.lastName || !body.email || !body.password){
    res.status(400).send(`required fields missing,example request:{
        firstName:Tushar,
        lastName:Rai,
        email:abc@gmail.com,
        password:12345
    }`)
    return;
   }
   for(let i=0;i<usersDataBase.length;i++){
    if(body.email.toLowerCase() == usersDataBase[i].email){
        res.status(400).send({message:`user already exists with the username ${usersDataBase[i].firstName}`})
        return;
    }
   }
   let newUser = {
    userId:nanoid(),
    firstName:body.firstName,
    lastName:body.lastName,
    email:body.email.toLowerCase(),
    password:body.password
   }
   usersDataBase.push(newUser);
   res.status(201).send({message: "User Created"});
})

app.post("/login",(req,res)=>{
    let body = req.body;

    if( !body.email || !body.password){
     res.status(400).send(`required fields missing,example request:{
         email:abc@gmail.com,
         password:12345
     }`)
     return;
    }
    let flag = false;
    for(let i=0;i<usersDataBase.length;i++){
        if(usersDataBase[i].email==body.email){
            flag = true;
            if(usersDataBase[i].password==body.password){
                res.status(200).send({
                    firstName:usersDataBase[i].firstName,
                    lastName:usersDataBase[i].lastName,
                    message:"Login Successfull"
                })
                return;
            }
            else{
                res.status(401).send({message:"Incorrect Password"})
                return;
            }

        }
    }
    if(flag==false){
        res.status(404).send({message:"User Not found,check your email or signup"})
        return;
    }
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})