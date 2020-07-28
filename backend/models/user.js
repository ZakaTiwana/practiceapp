var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name  : { trim:true, type: String, require:[true,"name is required"]},
    email : {trim:true,type: String, require:[true,"email is required"], index:true, unique:true},
    password:{type:String, required:[true,"password is required"]},
    image : {type: String,required:[true,"img is required"]},  
    age: {type: Number, require:[true,"age is required"],max:150,min:8},
    dob: {type:Date,required:[true,"dob is required"]}
},{timestamps:true});

// hash the password
userSchema.methods.generateHash = async (password) =>{
    return await bcrypt.hash(password, bcrypt.genSaltSync(8), null);
};
  
// checking if password is valid
userSchema.methods.validPassword = async (check_password,hash_password) =>{
    return await bcrypt.compare(check_password, hash_password);
};

module.exports = mongoose.model("User",userSchema);