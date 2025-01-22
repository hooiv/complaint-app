// lib/authMiddleware.js (Simplified - Just calls next)
const authMiddleware = async (req, res, next) => {
    console.log("authMiddleware: (Simplified - Just calling next())");
    next(); // Just call next
  };
  export default authMiddleware;