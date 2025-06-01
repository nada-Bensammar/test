const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const mongoose = require('mongoose')

const URL = process.env.URL_DB;
const dbConnection=()=>{
  mongoose
  .connect(URL)
  .then((conn) => {
    console.log(`data base is connectingn`);
  })
  //.catch((err) => {
   // console.error(`the error of data base is ${err}`);
   // process.exit(1);
  //});
}

  module.exports = dbConnection;
