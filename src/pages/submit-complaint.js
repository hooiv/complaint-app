// pages/submit-complaint.js
import React from 'react';
import ComplaintForm from '../components/ComplaintForm';

const SubmitComplaintPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Submit a Complaint</h1>
        <ComplaintForm />
      </div>
    </div>
  );
};

export default SubmitComplaintPage;