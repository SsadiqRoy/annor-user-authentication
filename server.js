const dotenv = require("dotenv");
const path = require("node:path");
const mongoose = require("mongoose");

dotenv.config({ path: path.join(__dirname, "config.env") });

process.on("uncaughtException", (error) => {
  console.log("uncaughtException 🔥", error);
  process.exit(1);
});

async function connectDB() {
  mongoose
    .connect(process.env.DB, {
      dbName: "annor",
      rejectUnauthorized: true,
    })
    .then(() => console.log("👍 Database Connection successfull"))
    .catch((error) => console.log("Database Connection Error 🔥", error));
}

connectDB();

const app = require("./app");

const server = app.listen(process.env.PORT, process.env.HOST, () => console.log("👉 Everything is running"));

process.on("unhandledRejection", (reason) => {
  console.log("unhandledRejection", reason);

  server.close(() => process.exit(1));
});
