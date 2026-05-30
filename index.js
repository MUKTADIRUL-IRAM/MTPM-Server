const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const port = process.env.PORT || 3000;


const connectionDB = require('./config/db');


const app = express();

connectionDB();// only once at startup

app.use(cors({
  origin:['http://localhost:5173'],//This defines who is allowed to access your backend
  credentials:true,//This allows cookies / authentication headers
  optionsSuccessStatus:200,//Before sending actual request, browser checks:
                           //“Is this allowed?”
                           //That check is called a preflight request
  allowedHeaders:["Content-Type","Authorization"],//Defines which headers frontend can send.
                                                  // "Content-Type" → JSON, form data etc."Authorization" → JWT token like
  methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"]
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth',require('./routes/authRoutes')); //app.use() connects Express app → router file;app.use() = base path
app.use('/project',require('./routes/projectRoutes'));
app.use('/task',require('./routes/taskRoutes'));
app.use('/users',require('./routes/usersDataRoutes'));
app.use('/workSpace',require('./routes/workSpaceRoutes'));
app.use('/invitation',require('./routes/invitationRoutes'));
app.use('/notification',require('./routes/notificationRoutes'));

app.get('/',(req,res)=>{
  res.send("Server is working");
});

app.listen(port,()=>{
    console.log(`Server is working on ${port}`);   
});

// Frontend request
//      ↓
// Express app (index.js)
//      ↓
// app.use() forwards request
//      ↓
// Router checks route (router.post)
//      ↓
// Controller runs