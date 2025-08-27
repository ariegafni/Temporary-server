import express from "express";
import router from "./routes";
import connectDB from "./db";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3002", 10);

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:3002",
      "http://127.0.0.1:3002",
      "http://10.0.2.2:3005",
      "capacitor://localhost"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", router);

connectDB();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`);
});
