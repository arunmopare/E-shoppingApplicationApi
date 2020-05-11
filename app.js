require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


//my Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//db connction
const app = express();
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DB CONNECTED");
    });

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//My Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes);

//Port
const port = process.env.PORT || 3000;

//Sterting server
app.listen(port, () => {
    console.log(`app is running ${port}`);
})