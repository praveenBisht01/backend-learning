const app = require("./src/app")
require("dotenv").config();
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const cont_to_db = require("./config/databse");

cont_to_db();


    




app.listen(3000, () => {
    console.log("this server is runnig on port 3000 ")
})