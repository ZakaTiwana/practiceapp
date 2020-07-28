const User = require("../models/user");
const path = require("path");
const { ErrorHandler } = require("../middlewares/error");
const { validationResult } = require('express-validator');
const fs = require("fs");

const getAllusers = async (req,res,next)=>{
    try {
        let docs = await User.find().select("-password");
        res.json(docs);
    } catch (error) {
        next(error);
    }
};
const getUserById = async (req,res,next) =>{
    try {
        const doc = await User.findById(req.params.id).select("-password");
        if (!doc) throw new ErrorHandler(404,"user not found");
        res.json(doc);
    } catch (error) {
        if(error.kind === "ObjectId")
            error.statusCode = 400;
        next(error);
    }
};

const updateUser = async (req,res,next)=>{
    try {  
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400,errors.array()[0].msg);
        }
        let doc = await User.findById(req.params.id);
        if (!doc) throw new ErrorHandler(404,"user not found");
        if(req.body.password) doc.password = await doc.generateHash(req.body.password);
        if(req.body.dob){
            const dob = Date.parse(req.body.dob); 
            doc.dob = dob ;    
        }
        if(req.file) {
            let folder = doc.image.split("/")[0];
            let filename = doc.image.split("/")[1];
            await fs.promises.unlink(path.join(__dirname,"..",folder,decodeURIComponent(filename)));    
            doc.image = "assets/"+encodeURIComponent(req.file.filename);
        }
        await doc.save();
        res.json({success:true});
    } catch (error) {
        if(req.file) await fs.promises.unlink(path.join(__dirname,"..","assets",req.file.filename));
        next(error);
    }
};

const addNewUser = async (req,res,next) =>{     
    try {
        if(!req.file) throw new ErrorHandler(400,"image is required");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400,errors.array()[0].msg);
        }
        const dob = Date.parse(req.body.dob);
        const newUser = new User(req.body);
        newUser.password = await newUser.generateHash(req.body.password);
        newUser.dob = dob;
        newUser.image = "assets/"+encodeURIComponent(req.file.filename);
        let doc = await newUser.save();
        delete doc.password;
        res.json({user_id : doc._id});
    } catch (error) {
        if(req.file) await fs.promises.unlink(path.join(__dirname,"..","assets",req.file.filename));
        if(error.code = 11000) // if duplicate in db
            error.statusCode = 400; // set bad request
            error.message = "email already registered";
        next(error);
    }
}

const deleteUser = async (req,res,next)=>{
    try {  
        let doc = await User.findByIdAndDelete(req.params.id);
        if (!doc) throw new ErrorHandler(404,"user not found");
        let folder = doc.image.split("/")[0];
        let filename = doc.image.split("/")[1];
        await fs.promises.unlinkSync(path.join(__dirname,"..",folder,decodeURIComponent(filename)));
        res.json({success:true});
    } catch (error) {
        if(error.kind === "ObjectId")
            error.statusCode = 400;
        next(error);
    }
};

const login = async (req,res,next) =>{
    try {
        const doc = await User.findOne({
            email:req.body.email
        });
        if (!doc) throw new ErrorHandler(401,"provided email is incorrect");
        if (!await doc.validPassword(req.body.password,doc.password)){
            throw new ErrorHandler(401,"provided email or password are incorrect");
        }
        res.json({success:true});
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
  getAllusers,
  getUserById,
  addNewUser,
  updateUser,
  deleteUser,
  login
};