const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require('path');

const app = express();
dotenv.config({path: "./config.env"});


// Routes import
const studentRoutes = require("./api/routes/student");
const educatorRoutes = require("./api/routes/educator");
const queryRoutes = require("./api/routes/query");
const fileRoutes = require("./api/routes/files");

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB connection
mongoose.connect(process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD), {
        useNewUrlParser: true,
    }
).then(() => console.log('Connected to Database!'));

// Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * means all
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // * means all
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // * means all
        return res.status(200).json({});
    }
    next();
});

// static files
const checkAuth = require("./api/middleware/checkAuth");
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'uploads')));

// Request handling
app.use("/student", studentRoutes);
app.use("/educator", educatorRoutes);
app.use("/query", queryRoutes);
app.use("/file", fileRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handling
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Exporting the app
module.exports = app;