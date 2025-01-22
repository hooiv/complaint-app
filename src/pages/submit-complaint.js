// pages/submit-complaint.js
import React from 'react';
import ComplaintForm from '../components/ComplaintForm';

const SubmitComplaintPage = () => {
  return (
      <div >
        <h6 className=" font-bold text-center">Submit a Complaint</h6>
        <ComplaintForm />
      </div>
  );
};

export default SubmitComplaintPage;