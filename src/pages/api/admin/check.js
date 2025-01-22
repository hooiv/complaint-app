// pages/api/admin/check.js (Reintroduce Middleware - Modified Export)
import authMiddleware from '../../../lib/authMiddleware';

const checkAdmin = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    return res.status(200).json({ isAdmin: true });
  }
  return res.status(403).json({ isAdmin: false });
};

const handler = authMiddleware(checkAdmin); // Call authMiddleware and store the result

export default handler; // Export the *result* (handler) as default