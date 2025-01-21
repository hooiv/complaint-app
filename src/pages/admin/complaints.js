import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ComplaintTable from '../../components/ComplaintTable';

const AdminComplaintsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/admin/check', { // Create this API route
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          setIsAdmin(true);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return <p>Unauthorized. Please log in as an administrator.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard - Manage Complaints</h1>
      <ComplaintTable />
    </div>
  );
};

export default AdminComplaintsPage;