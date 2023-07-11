import express from "express";
import { connectDB } from "./db/connectDB.js";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
const DATABASE_URL = "mongodb://127.0.0.1:27017/Blog";
const app = express();
const port = 5000;
app.use(express.json());
app.use("/api/users", router);
app.use("/api/blogs", blogRouter);
connectDB(DATABASE_URL);
app.listen(port, () => {
  console.log("Server is Listening");
});
