// pages/api/admin/check.js (Log req and res in check.js)
import authMiddleware from '../../../lib/authMiddleware';

const checkAdmin = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    return res.status(200).json({ isAdmin: true });
  }
  return res.status(403).json({ isAdmin: false });
};

const handler = async (req, res) => { // Wrap with an async function to log
  console.log("check.js: Received req object:", req); // Log req in check.js
  console.log("check.js: Received res object:", res); // Log res in check.js
  return authMiddleware(req, res, checkAdmin); // Call authMiddleware
};

export default handler;