const mongoose = require("mongoose");

require("dotenv").config();
const url = process.env.DB_STRING;

const connect = async () => {
    return await mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .catch((err) => console.error(err));
};

module.exports = connect;
