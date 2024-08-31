const User = require('../Model/userModel')
const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// Register user 
const register = async (req, res) => {
    const {name,email, password, role} = req.body;

    try {
        // checking if user exist already 
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: 'User Already Exist'});
        }

        // creating the new user 
    user = new User({ name, email, password, role });
    await user.save();

// creating the jwt token 
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

    res.json({ token });
        
    } catch (err) {
        console.error(err.message);
    res.status(500).send('Server Error');
        
    }
}




// Login User 
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  
      const payload = { user: { id: user.id, role: user.role } };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  


  module.exports = { register, login };