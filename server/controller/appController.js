import UserModel from "../models/User.model.js"

/** POST: http://localhost:5000/api/register */

export async function register(req, res){
    res.json('Register Route')
}

/** POST: /api/login */
export async function login(req, res){
    res.json('Login Route')
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
