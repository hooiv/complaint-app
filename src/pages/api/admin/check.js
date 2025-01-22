// pages/api/admin/check.js (Corrected - Await authMiddleware)
import authMiddleware from '../../../lib/authMiddleware';

const checkAdmin = async (req, res) => {
  if (req.user && req.user.isAdmin) {
    return res.status(200).json({ isAdmin: true });
  }
  return res.status(403).json({ isAdmin: false });
};

const handler = async (req, res) => { // Async wrapper for await
  console.log("check.js: Received req object:", req);
  console.log("check.js: Received res object:", res);
  await authMiddleware(req, res, async () => { // AWAIT authMiddleware! and wrap checkAdmin in another async func
    return checkAdmin(req, res)
  });
};

export default handler;