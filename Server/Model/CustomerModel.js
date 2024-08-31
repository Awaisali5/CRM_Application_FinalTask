const mongoose = require("mongoose");
const User = require('../Model/userModel')



// creating the schema
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, Provide Name Field']
 },
 contactInformation : {
    type: String,
    required: [true, 'Please, Provide Contact Information Field']
    
 },
 Company: {
    type: String,
    required: [true, 'Please, Provide Company  Field']
    },
    Address : {
        type: String,
        required: [true, 'Please, Provide Address  Field']
        
     },
     Industry : {
        type: String,
        required: [true, 'Please, Provide Industry Field']
        
     },
     Notes : {
        type: String,
        required: [true, 'Please, Provide Note Field'] 
     },
     createdBy: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
     }
   
});

module.exports= mongoose.model('Customer', CustomerSchema)
