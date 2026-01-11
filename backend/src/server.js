const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



const User = require("./models/User");


