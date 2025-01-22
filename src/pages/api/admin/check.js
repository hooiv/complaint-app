// pages/api/admin/check.js (Simplified - No Middleware)

export default async function checkAdmin(req, res) {
  res.status(200).json({ message: 'Check Admin API route is working' });
}