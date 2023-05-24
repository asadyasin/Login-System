import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trimLeft();

    if (!token) {
      return res.status(403).send("Authorization Access Denied");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid token" });
  }
};


export const localVariables = async (req, res, next) => {
    req.app.locals ={
        OTP: null,
        resetSession: false
    }
    next()
};