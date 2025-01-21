import dbConnect from '../../../lib/dbConnect';
import Complaint from '../../../models/Complaint';
import { sendStatusUpdateEmail } from '../../../lib/emailService';
import authMiddleware from '../../../lib/authMiddleware';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: complaint });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      await authMiddleware(req, res, async () => { // Protect PUT route
        if (!req.user || !req.user.isAdmin) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
          const complaint = await Complaint.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });
          if (!complaint) {
            return res.status(404).json({ success: false });
          }
          await sendStatusUpdateEmail(complaint);
          res.status(200).json({ success: true, data: complaint });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
      });
      break;

    case 'DELETE':
      await authMiddleware(req, res, async () => { // Protect DELETE route
        if (!req.user || !req.user.isAdmin) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
          const deletedComplaint = await Complaint.findByIdAndDelete(id);
          if (!deletedComplaint) {
            return res.status(404).json({ success: false });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      });
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}