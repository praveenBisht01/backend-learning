require('dotenv').config()
const app = require("./src/app")
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const Cnt_to_DB = require("./config/Database")





Cnt_to_DB();

app.listen(3000, () => {
    console.log("server is running om port number 3000")
})