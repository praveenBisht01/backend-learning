require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = require("./src/app");
const Cnt_to_DB = require("./src/config/database");

Cnt_to_DB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
