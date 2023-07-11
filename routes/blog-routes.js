import express from "express";
import {
  addBlog,
  deleteById,
  getAllBlogs,
  getById,
  updateblog,
} from "../controller/blog-controller.js";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateblog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteById);
export default blogRouter;
