import UserModel from "../models/User.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import otpGenerator from "otp-generator";

dotenv.config();

/** POST: http://localhost:8080/api/register */

export const register = async (req, res) => {
    try {
      const { username, password, profile, email } = req.body;
  
      // Check if username or email already exists
      const existingUser = await UserModel.findOne().or([{ username }, { email }]);
      if (existingUser) {
        return res.status(400).send({ error: "Username or email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
      });
  
      // Save the user
      const savedUser = await user.save();
  
      res.status(201).send({ msg: "User registered successfully", user: savedUser });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  

/** POST: /api/login */
export const login= async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User Not Found" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(400).send({ error: "Password does Not Match" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).send({
      msg: "User login successfully...!",
      username: user.username,
      token
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

/** GET: /api/user/username */
export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).send({ error: "Invalid Username" });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User Not Found" });
    }

    const { password, ...rest } = user.toObject();
    return res.status(200).send(rest);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/** GET: /api/user/userId */
// export const getUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     if (!userId) {
//       return res.status(400).send({ error: "Invalid userId" });
//     }

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).send({ error: "User Not Found" });
//     }

//     const { password, ...rest } = user.toObject();
//     return res.status(200).send(rest);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };

/** PUT: /api/updateuser */
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    
    if (!userId) {
      return res.status(500).send({ error: "User not found...!" });
    }

    const body = req.body;
    const user = await UserModel.findByIdAndUpdate( {_id : userId }, body);

    if (!user) {
      return res.status(500).send({ error: "User not found...!" });
    }

    return res.status(200).send({ msg: "User updated successfully" });
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

/** GET: /api/generateOTP*/
export const generateOTP = async (req, res) => {
  try {
    const generatedOTP = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    req.app.locals.OTP = generatedOTP;
    res.status(200).send({ code: generatedOTP });
  } catch (error) {
    // Handle any errors that occurred during OTP generation
    res.status(500).send({ error: 'Failed to generate OTP' });
  }
};

/** GET: /api/verifyOTP */
export const verifyOTP = async (req, res) => {
  try {
    const { code } = req.query;
    const generatedOTP = req.app.locals.OTP;

    if (!generatedOTP) {
      return res.status(400).send({ error: "OTP verification failed regenerate OTP" });
    }

    if (!code) {
     return res.status(400).send({ error: "No OTP provided for verification" });
    }

    if (parseInt(generatedOTP) === parseInt(code)) {
      req.app.locals.OTP = null;
      req.app.locals.resetSession = true;
      return res.status(201).send({ msg: "OTP Verified Successfully...!" });
    }

     res.status(401).send({ error: "Invalid OTP" });
  } catch (error) {
    // Handle any other errors that occurred during OTP verification
    res.status(500).send({ error: "Error occurred during OTP verification" });
  }
};

/** successfully redirect user when OTP is valid */
/** GET: /api/createResetSession */
export const createResetSession = async (req, res) =>{
    if (req.app.locals.resetSession){
      req.app.locals.resetSession = false;
      return res.status(201).send({ msg: "Access Granted Successfully...!" });
    }
    res.status(440).send({ error: "Session Experied" });
}

/**Update user password when session is valid */
/** PUT: api/resetPassword */
export const resetPassword = async (req, res) => {
  try {
    // Check if the reset session is active
    if (!req.app.locals.resetSession) {
      return res.status(440).json({ error: 'Session Expired' });
    }

    const { username, password } = req.body;

    try {
      // Find the user based on the username
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      // Clear the reset session
      req.app.locals.resetSession = false;

      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
