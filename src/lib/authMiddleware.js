// lib/authMiddleware.js (Modified - Detailed JWT/User Lookup Logs)
import jwt from 'jsonwebtoken';
import dbConnect from './dbConnect';
import User from '../models/User';

const authMiddleware = async (req, res, next) => {
  console.log("authMiddleware: JWT_SECRET from env:", process.env.JWT_SECRET);

  if (!req || !req.headers) {
    console.error("authMiddleware: req or req.headers is UNDEFINED!");
    return res.status(500).json({ message: 'Server error: Request headers missing.' });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    console.log("authMiddleware: Extracted token:", token); // Log extracted token

    try {
      console.log("authMiddleware: Verifying JWT..."); // Log JWT verification start
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("authMiddleware: JWT Decoded SUCCESSFULLY:", decoded); // Log decoded payload
      await dbConnect();
      console.log("authMiddleware: Database connected for user lookup"); // Log DB connect for lookup
      req.user = await User.findById(decoded._id);
      console.log("authMiddleware: User.findById RESULT:", req.user); // Log User.findById result
      if (!req.user) {
        console.log("authMiddleware: User NOT FOUND in DB for decoded _id:", decoded._id); // Log user not found in DB
        return res.status(401).json({ message: 'Invalid token - User not found' });
      }
      console.log("authMiddleware: User FOUND and attached to req.user"); // Log success
      next(); // Success - call next middleware/handler

    } catch (jwtError) { // Catch JWT verification errors
      console.error("authMiddleware: JWT Verification ERROR:", jwtError); // Log JWT verification error details
      return res.status(401).json({ message: 'Invalid token' });
    }

  } catch (middlewareError) { // Catch ANY errors in authMiddleware
    console.error("authMiddleware: UNHANDLED ERROR in middleware:", middlewareError);
    return res.status(500).json({ message: 'Server error: Authentication failed.' });
  }
};

export default authMiddleware;