// pages/submit-complaint.js
import React from 'react';
import ComplaintForm from '../components/ComplaintForm'; // Import ComplaintForm

const SubmitComplaintPage = () => {
  return (
    <div>
      <h1>Submit a Complaint</h1>
      <ComplaintForm /> {/* Render the ComplaintForm component */}
    </div>
  );
};

export default SubmitComplaintPage;