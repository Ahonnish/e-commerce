const User = require("../models/User")
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // res.status(201).json({   // returns password back in API Response 
    //   message: "User registered successfully",
    //   user
    // }); 


    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      message: "User registered successfully",
      // user: userWithoutPassword
      
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });



  } catch (error) {
    console.error("Signup Error : ", error);
    res.status(500).json({ message: "Server error" });
  }
};