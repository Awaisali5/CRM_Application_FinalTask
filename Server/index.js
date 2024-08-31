const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const connect = require('./DB/Connect')

const userRoutes = require('./Routes/UserRoute')
const CustomerRoutes = require('./Routes/customerRoute')
const LeadsRoutes = require('./Routes/Leads')
const authRoutes = require('./Routes/auth')
const NotificationsRoutes = require('./Routes/Notifications')
const RemindersRoutes = require('./Routes/Reminders')
const ReportsRoutes = require('./Routes/Reports');


// setting up the app 
const app = express();

// setting up the cors 

app.use(express.json({extended: true}));
app.use(cors({credentials:true, origin: "http://localhost:3000", methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}));
app.use(express.urlencoded({extended:true}))

// middleware 


// router 
app.use('/api/users', userRoutes)
app.use('/api/customers', CustomerRoutes)
app.use('api/auth', authRoutes)
app.use('/api/leads', LeadsRoutes)
app.use('/api/notification', NotificationsRoutes)
app.use('/api/reminder', RemindersRoutes)
app.use('/api/reports', ReportsRoutes)



app.get('/', (req, res) => {
  res.send('CRM Backend is running');
});









const PORT = process.env.PORT || 5000;

connect(process.env.MONGO_URL)
  .then(app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
  .catch((error) => console.log(error));


