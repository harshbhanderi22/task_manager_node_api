//Package Import
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Route Import
const user = require('./Routes/user');
const task = require('./Routes/task');

//Middleware
app.use(express.json());

//Database Connection
mongoose.connect(
    process.env.DB_CONNECT,
    () => {console.log("Database Connected")}
);

//Route Middleware
app.use('/api/user/', user);
app.use('/api/task/', task);

app.listen(5000);