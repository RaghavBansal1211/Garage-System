const express = require('express');
const cookieParser = require("cookie-parser");
var cors = require('cors')

const app = express();


const {connectDB} = require("./config");
const PORT=8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
  }));



const customerHandler = require("./routes/customer");
const userHandler = require("./routes/user");
const { restrictToLoggedInUserOnly,restrictTo } = require('./middleware/auth');
const loginHandler = require("./routes/login");
const stockHandler = require("./routes/inventory");
const financeHandler = require("./routes/finance");
const reloadHandler = require("./routes/reload");



// Database Connection
connectDB("mongodb://127.0.0.1:27017/Garage");

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT: ${PORT}`);
})

app.use('/',loginHandler)
app.use('/customer',restrictToLoggedInUserOnly,restrictTo(["TECHNICIAN"]),customerHandler);    //TESTED -> WORKING FINE
app.use('/user',restrictToLoggedInUserOnly,restrictTo(["ADMIN","SUPERADMIN"]),userHandler);    //TESTED -> WORKING FINE
app.use('/inventory',restrictToLoggedInUserOnly,restrictTo(["STOCKMANAGER"]),stockHandler);    //TESTED -> WORKING FINE
app.use('/finance',restrictToLoggedInUserOnly,restrictTo(["FINANCEMANAGER"]),financeHandler);  //TESTED -> WORKING FINE
app.use('/reload',restrictToLoggedInUserOnly,restrictTo(["TECHNICIAN","SUPERADMIN","ADMIN","STOCKMANAGER","FINANCEMANAGER"]),reloadHandler);