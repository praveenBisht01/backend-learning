require("dotenv").config();
const app = require("./src/app")
const mongoose = require("mongoose");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const Cnt_to_DB = require("./config/Database");






Cnt_to_DB();

app.listen(3000,()=> {
    console.log("this server is running on port number 3000")
})

