// lib/emailService.js
import nodemailer from 'nodemailer';

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Function to send email when a new complaint is submitted
export const sendNewComplaintEmail = async (complaint) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL, // Send to admin
    subject: 'New Complaint Submitted',
    text: `A new complaint has been submitted.
      Title: ${complaint.title}
      Description: ${complaint.description}
      Status: ${complaint.status}
    `,
    html: `
      <p>A new complaint has been submitted.</p>
      <p><strong>Title:</strong> ${complaint.title}</p>
      <p><strong>Description:</strong> ${complaint.description}</p>
      <p><strong>Status:</strong> ${complaint.status}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('New complaint email sent');
  } catch (error) {
    console.error('Error sending new complaint email:', error);
  }
};

// Function to send email when a complaint status is updated
export const sendStatusUpdateEmail = async (complaint) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL, // Send to admin
    subject: 'Complaint Status Updated',
    text: `The status of a complaint has been updated.
        Title: ${complaint.title}
        New Status: ${complaint.status}
        Updated Date: ${new Date(complaint.updatedAt).toLocaleString()}
    `,
    html: `
        <p>The status of a complaint has been updated.</p>
        <p><strong>Title:</strong> ${complaint.title}</p>
        <p><strong>New Status:</strong> ${complaint.status}</p>
        <p><strong>Updated Date:</strong> ${new Date(complaint.updatedAt).toLocaleString()}</p>
     `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Complaint status update email sent');
  } catch (error) {
    console.error('Error sending complaint status update email:', error);
  }
};