/** POST: /api/login */
export const login = async (req, res) => {
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
  
      // Create a new session document in the database
      const session = new SessionModel({
        userId: user._id,
        token
      });
  
      // Save the session document
      await session.save();
  
      res.status(200).send({
        msg: "User login successfully...!",
        username: user.username,
        token
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  /** POST: /api/logout */
  export const logout = async (req, res) => {
    try {
      const { userId } = req.user;
  
      // Delete the session document from the database
      await SessionModel.deleteOne({ userId });
  
      res.status(200).send({ msg: "User logged out successfully" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  