const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        required: [true, 'Please, Provide Name Field']
    },
    email :{
        type: String,
        required: [true, 'Please, Provide Email Field']
    },
    password :{
        type: String,
        required: [true, 'Please, Provide Password Field'],
        minlength: 6
    },
    role :{
        type: String,
        required: [true, 'Please, Provide role Field'],
        enum: ['Admin', 'Sales-Representative', 'Manager'],
        default: 'Sales-Representative'
    },

});

// password ecrypted 

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Password verification method
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };


module.exports = mongoose.model('User', UserSchema)