// pages/api/admin/check.js (using middleware - modified export)
import authMiddleware from '../../../lib/authMiddleware';

const checkAdmin = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    return res.status(200).json({ isAdmin: true });
  }
  return res.status(403).json({ isAdmin: false });
};

const handler = authMiddleware(checkAdmin);
export default handler;