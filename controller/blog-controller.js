import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  console.log(req.body)
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Unable to Find" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
   // const session = await mongoose.startSession();
    //session.startTransaction();
    await blog.save();
    existingUser.blogs.push(blog);
    await existingUser.save();
    //await session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  return res.status(200).json({ blog });
};

export const updateblog = async (req, res, next) => {
  const { title, description } = req.body;

  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable To Update" });
  }
  return res.status(200).json(blog);
};

export const getById = async (req, res, next) => {
  let blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

export const deleteById = async (req, res, next) => {
  let blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(blogId).populate("user");
    await blog.user.blog.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ message: "Blog Deleted SuccessFully" });
};
