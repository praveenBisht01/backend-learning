require("dotenv").config();
const app = require("./src/app");
const CntToDB = require("./config/database");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

CntToDB();

app.listen(3000, () => {
  console.log("This port is running on port number 3000");
});
