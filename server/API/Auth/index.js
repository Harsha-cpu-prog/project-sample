import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Models
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route     /signup
Des      Register new user
Params    none
Access    Public
Method    POST  
*/

Router.post("/signup", async (req,res)=>{
    try{
        await UserModel.findByEmailAndPhone(req.body.credentials);
        //  save DB
       const newUser= await UserModel.create(req.body.credentials);
        // generate jwt token
        const token = newUser.generateJwtToken();
        // return
        return res.status(200).json({ token , status:"success"});
    }catch (error) {
       console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

/*
Route     /signin
Des       Signin with email and password
Params    none
Access    Public
Method    POST  
*/
Router.post("/signin", async (req,res)=>{
    try{
const user = await UserModel.findByEmailAndPassword(req.body.credentials);
      
        const token = user.generateJwtToken();
        return res.status(200).json({ token , status:"success"});
    }catch (error) {
       console.log(error);
        return res.status(500).json({ error: error.message });
    }
});



export default Router;