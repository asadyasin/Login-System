import UserModel from "../models/User.model";
export const verifyUserName = async (req, res, next) => {
    try {
            const { username } = req.method === "GET" ? req.query : req.body ;
            const user = await UserModel.findOne({ username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
}