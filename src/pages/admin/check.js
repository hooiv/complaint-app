import authMiddleware from '../../../../lib/authMiddleware';

const checkAdmin = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    return res.status(200).json({ isAdmin: true });
  }
  return res.status(403).json({ isAdmin: false });
};

export default authMiddleware(checkAdmin);