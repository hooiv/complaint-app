// lib/authMiddleware.js (Modified - try...catch for error handling)
import jwt from 'jsonwebtoken';
import dbConnect from './dbConnect';
import User from '../models/User';

const authMiddleware = async (req, res, next) => {
  console.log("authMiddleware: JWT_SECRET from env:", process.env.JWT_SECRET);

  if (!req || !req.headers) {
    console.error("authMiddleware: req or req.headers is UNDEFINED!");
    return res.status(500).json({ message: 'Server error: Request headers missing.' });
  }

  try { // ADD try...catch BLOCK

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try { // Inner try...catch for JWT verification
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await dbConnect();
      req.user = await User.findById(decoded._id);
      if (!req.user) {
        return res.status(401).json({ message: 'Invalid token - User not found' });
      }
      next(); // Success - call next middleware/handler
    } catch (jwtError) { // Catch JWT verification errors
      console.error("authMiddleware: JWT Verification ERROR:", jwtError);
      return res.status(401).json({ message: 'Invalid token' });
    }

  } catch (middlewareError) { // Catch ANY errors in authMiddleware
    console.error("authMiddleware: UNHANDLED ERROR in middleware:", middlewareError); // Log full error
    return res.status(500).json({ message: 'Server error: Authentication failed.' }); // Generic 500 error to client
  }
};

export default authMiddleware;