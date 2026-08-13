require("dotenv").config();
const app = require("./src/app");
const Cnt_to_DB = require("../Backend/config/databse");
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);


Cnt_to_DB();

app.listen(3000, () => {
  console.log("This server is running on port 3000");
});
