const express = require('express');
const cookieParser = require("cookie-parser");

const app = express();


const {connectDB} = require("./config");
const PORT=8000;

app.use(express.json());
app.use(cookieParser());



const customerHandler = require("./routes/customer");
const userHandler = require("./routes/user");
const { restrictToLoggedInUserOnly,restrictTo } = require('./middleware/auth');
const loginHandler = require("./routes/login");
const stockHandler = require("./routes/inventory");



// app.use(restrictToLoggedInUserOnly);
// app.use(restrictTo);

// Database Connection
connectDB("mongodb://127.0.0.1:27017/Garage");




app.listen(PORT,()=>{
    console.log(`Server is listening at PORT: ${PORT}`);
})

app.use('/',loginHandler)
app.use('/customer',restrictToLoggedInUserOnly,restrictTo(["TECHNICIAN"]),customerHandler);
app.use('/user',restrictToLoggedInUserOnly,restrictTo(["ADMIN","SUPERADMIN"]),userHandler);
app.use('/inventory',restrictToLoggedInUserOnly,restrictTo(["STOCKMANAGER"]),stockHandler)

