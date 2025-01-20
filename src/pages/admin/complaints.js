import ComplaintTable from '@/components/ComplaintTable';

const AdminComplaintsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard - Manage Complaints</h1>
      <ComplaintTable />
    </div>
  );
};

export default AdminComplaintsPage;