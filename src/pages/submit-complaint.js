// pages/submit-complaint.js
import React from 'react';
import ComplaintForm from '../components/ComplaintForm';

const SubmitComplaintPage = () => {
  return (
      <div >
        <h1 className=" font-bold text-center">Submit a Complaint</h1>
        <ComplaintForm />
      </div>
  );
};

export default SubmitComplaintPage;