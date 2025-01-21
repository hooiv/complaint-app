import dbConnect from '@/lib/dbConnect';
import Complaint from '@/models/Complaint';
import { sendNewComplaintEmail } from '@/lib/emailService';
import authMiddleware from '../../../lib/authMiddleware';


export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const complaints = await Complaint.find({});
        res.status(200).json({ success: true, data: complaints });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const complaint = await Complaint.create(req.body);
        await sendNewComplaintEmail(complaint);
        res.status(201).json({ success: true, data: complaint });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}