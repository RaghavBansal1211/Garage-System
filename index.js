const express = require('express');
const app = express();


const {connectDB} = require("./config");
const PORT=8000;

app.use(express.json());


const customerHandler = require("./routes/customer");

// Database Connection
connectDB("mongodb://127.0.0.1:27017/Garage");




app.listen(PORT,()=>{
    console.log(`Server is listening at PORT: ${PORT}`);
})


app.use('/customer',customerHandler);
