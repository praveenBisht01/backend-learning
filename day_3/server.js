    require('dotenv').config()
const app = require("./src/app")
const connectTOdb = require("./config/database")
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectTOdb();

app.listen(3000, () => {
    console.log("Server is running on port number 3000")
})