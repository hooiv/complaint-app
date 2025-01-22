// lib/authMiddleware.js (Updated - More robust error handling and logging)
import jwt from 'jsonwebtoken';
import dbConnect from './dbConnect';
import User from '../models/User';

const authMiddleware = async (req, res, next) => {
  try { // Add try-catch block around the entire middleware logic
    
  if (!req || !req.headers) { // ADD THIS CHECK
    console.error("authMiddleware: req or req.headers is UNDEFINED!");
    return res.status(500).json({ message: 'Server error: Request headers missing.' });
  }


    const authHeader = req.headers?.authorization;
    console.log("authMiddleware: authHeader:", authHeader); // Log authHeader

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("authMiddleware: No authHeader or not Bearer token"); // Log missing/invalid authHeader
      return res.status(401).json({ message: 'Authentication required - No token' });
    }

    const token = authHeader.split(' ')[1];
    console.log("authMiddleware: Extracted token:", token); // Log extracted token

    let decoded; // Declare decoded outside try block
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("authMiddleware: JWT Decoded successfully:", decoded); // Log decoded payload
    } catch (jwtError) {
      console.error("authMiddleware: JWT Verification ERROR:", jwtError); // Log JWT verification error
      return res.status(401).json({ message: 'Invalid token - JWT verification failed', error: jwtError.message });
    }

    if (!decoded || !decoded._id) { // Check if decoded is valid and has _id
      console.error("authMiddleware: Decoded JWT is invalid or missing _id:", decoded); // Log invalid/missing _id
      return res.status(401).json({ message: 'Invalid token - Decoded JWT invalid' });
    }

    await dbConnect();
    console.log("authMiddleware: Database connected"); // Log DB connection

    req.user = await User.findById(decoded._id);
    console.log("authMiddleware: User.findById result:", req.user); // Log User.findById result

    if (!req.user) {
      console.log("authMiddleware: User NOT FOUND for decoded _id:", decoded._id); // Log user not found
      return res.status(401).json({ message: 'Invalid token - User not found' });
    }

    console.log("authMiddleware: Authentication SUCCESSFUL for user:", req.user.email); // Log success
    next(); // Call next() if everything is successful

  } catch (middlewareError) { // Catch any errors in the middleware itself
    console.error("authMiddleware: Middleware ERROR:", middlewareError); // Log middleware errors
    return res.status(500).json({ message: 'Authentication middleware error', error: middlewareError.message }); // Return 500 for middleware errors
  }
};

export default authMiddleware;