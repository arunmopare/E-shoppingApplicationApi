require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');



//my Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/catogory");
const productRoutes = require("./routes/product");
const OrderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment")
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
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api",OrderRoutes);
app.use("/api",stripeRoutes);

//Port
const port = process.env.PORT || 3100;

//Sterting server
app.listen(port, () => {
    console.log(`app is running ${port}`);
})