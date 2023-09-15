const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const app = express();
dotenv.config({path: './config.env'});
const db = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const PORT = process.env.PORT || 3000;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "test",
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});