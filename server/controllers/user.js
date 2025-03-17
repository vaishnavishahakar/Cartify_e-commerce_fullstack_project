import bcrypt from "bcrypt"; //library
import User from "./../models/User.js";

const postSignup = async (req, res) => {
    const { name, email, phone, address, password, rePassword } = req.body;
  
    if (password !== rePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords does not match" });
    }
  
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
  
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
  
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone is required" });
    }
  
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }
  
    const salt = bcrypt.genSaltSync(10);
  
    try{
      const newUser = new User({
          name,
          email,
          phone, 
          address,
          password: bcrypt.hashSync(password, salt),
      });
  
      const savedUser = await newUser.save();
  
      return res.json({
          success: true,
          message: "Signup successful",
          data: {
              name: savedUser.name,
              email: savedUser.email,
              phone: savedUser.phone,
              address: savedUser.address,
          }
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

export { postSignup };