const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("server connected to database");
    })
    .catch((err) => {
      console.log("Error connecting to database");
      process.exit(1); //if db not connected then close the server as it's useless without a db
    });
}

module.exports = connectToDB;
