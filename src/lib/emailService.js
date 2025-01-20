import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for 465, `false` for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNewComplaintEmail(complaint) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Complaint Submitted: ${complaint.title}`,
    text: `A new complaint has been submitted:\n\nTitle: ${complaint.title}\nCategory: ${complaint.category}\nPriority: ${complaint.priority}\nDescription: ${complaint.description}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('New complaint email sent');
  } catch (error) {
    console.error('Error sending new complaint email:', error);
  }
}

export async function sendStatusUpdateEmail(complaint) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL, // Or potentially the user who submitted it if you implement user tracking
    subject: `Complaint Status Updated: ${complaint.title}`,
    text: `The status of the complaint "${complaint.title}" has been updated to: ${complaint.status}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Status update email sent');
  } catch (error) {
    console.error('Error sending status update email:', error);
  }
}