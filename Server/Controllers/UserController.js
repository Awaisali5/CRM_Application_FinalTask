const User = require('../Model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//***************/ Register User ***********
// POST: /register 
// UnProtected 
const register = async (req,res, next ) => {
    res.send('Register User')
}



//***************/  User Login ***********
// POST: /login 
// UnProtected 
const login = async (req,res, next ) => {
    res.send('Login User')
}



module.exports = {register, login}
