import UserModel from "../models/User.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** POST: http://localhost:8080/api/register */

export async function register(req, res) {
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
export async function login(req, res){
    try {
      const {email,password} = req.body;

      UserModel.findOne({email})
      .then( user=>{
        bcrypt.compare(password, user.password)
          .then(passwordChecked=>{
            if(!passwordChecked) return res.status(400).send({ error: "Don't have password"})
            
            // create jwt token
            jwt.sign()
            
          })
          .catch(error =>{res.status(400).send({ error: "Password does Not Match"})})
      })
      .catch(error =>{res.status(400).send({ error: "User Not Found"})})

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}

/** GET: /api/user/name */
export async function getUser(req, res){
    res.json('getUser Route')
}

/** PUT: /api/updateuser */
export async function updateUser(req, res){
    res.json('updateUser Route')
}

/** GET: /api/generateOTP*/
export async function generateOTP(req, res){
    res.json('generateOTP Route')
}

/** GET: /api/verifyOTP */
export async function verifyOTP(req, res){
    res.json('verifyOTP Route')
}

/** successfully redirect user when OTP is valid */
/** GET: /api/createResetSession */
export async function createResetSession(req, res){
    res.json('createResetSession Route')
}

/**Update user password when session is valid */
/** PUT: api/resetPassword */
export async function resetPassword(req, res){
    res.json('resetPassword Route')
}
