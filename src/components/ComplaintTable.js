// components/ComplaintTable.js
import React, { useState, useEffect } from 'react';

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear any previous errors
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('/api/complaints', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setComplaints(data.data);
        } else {
          setError(new Error(data.message || 'Failed to fetch complaints')); // Set error from backend message
        }
      } catch (e) {
        setError(e); // Set error from fetch or JSON parsing
        console.error("Could not fetch complaints:", e);
      } finally {
        setLoading(false); // End loading, regardless of success or failure
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    setError(null); // Clear any previous errors
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the complaints state to reflect the change in status
      setComplaints(currentComplaints =>
        currentComplaints.map(complaint =>
          complaint._id === complaintId ? { ...complaint, status: newStatus } : complaint
        )
      );
      console.log(`Complaint ${complaintId} status updated to ${newStatus}`); // Success log
    } catch (e) {
      setError(e);
      console.error("Could not update complaint status:", e);
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const statusMatch = filterStatus ? complaint.status === filterStatus : true;
    const priorityMatch = filterPriority ? complaint.priority === filterPriority : true;
    return statusMatch && priorityMatch;
  });

  if (loading) return <p>Loading Complaints...</p>;
  if (error) return <p>Error loading complaints: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Manage Complaints</h2>
      <div className="mb-4 flex space-x-2">
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Open">Open</option>
          <option value="Investigating">Investigating</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200"> {/* Added divide-y classes for table styling */}
          <thead className="bg-gray-50 text-black"> {/* Added bg-gray-50 and text-black for header */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th> {/* Tailwind classes for th */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th> {/* Tailwind classes for th */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th> {/* Tailwind classes for th */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th> {/* Tailwind classes for th */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> {/* Tailwind classes for th */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> {/* Tailwind classes for th */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200"> {/* Added bg-white and divide-y for tbody */}
            {filteredComplaints.map((complaint) => (
              <tr key={complaint._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.title}</td> {/* Tailwind classes for td */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.category}</td> {/* Tailwind classes for td */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.priority}</td> {/* Tailwind classes for td */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(complaint.dateSubmitted).toLocaleDateString()}</td> {/* Tailwind classes for td */}
                <td className="px-6 py-4 whitespace-nowrap text-sm"> {/* Tailwind classes for td and status span */}
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${complaint.status === 'Resolved' ? 'green' : complaint.status === 'Rejected' ? 'red' : 'yellow'}-100 text-${complaint.status === 'Resolved' ? 'green' : complaint.status === 'Rejected' ? 'red' : 'yellow'}-800`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> {/* Tailwind classes for td and select */}
                  <select
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Open">Open</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                     <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;