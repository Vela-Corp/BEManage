import Auth from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await Auth.findOne({ email });
  // mã hoá mật khẩu
  if (userExist) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const Newuser = new Auth({ name, email, password: hashPassword });
  try {
    await Newuser.save();
    return res
      .status(201)
      .json({ message: "Thêm tài khoản thành công", Newuser });
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Tất cả không được để trống" });
  }
  const user = await Auth.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email không tồn tại" });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Sai mật khẩu hoặc tài khoản" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_CODE, {
    expiresIn: "1d",
  });
  res.cookie("token", token, { httpOnly: true });
  return res
    .status(200)
    .json({ message: "Đăng nhập thành công", token: token, user: user });
};

export const signout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Đăng xuất thành công" });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Auth.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
    return res.status(200).json(user);
  } catch (error) {
    if (
      error.kind === "ObjectId" ||
      error.name === "NotFound" ||
      error.path === "_id"
    ) {
      return res.status(404).json({ message: "Id không hợp lệ" });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(400).json({ message: "Bạn chưa đăng nhập" });
  try {
    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    const user = await Auth.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
    return res.status(200).json(user);
  } catch (error) {
    if (
      error.kind === "ObjectId" ||
      error.name === "NotFound" ||
      error.path === "_id"
    ) {
      return res.status(404).json({ message: "Id không hợp lệ" });
    }
    return res.status(500).json({ message: error.message });
  }
};
