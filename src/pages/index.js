import ComplaintForm from '@/components/ComplaintForm';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit a Complaint</h1>
      <ComplaintForm />
    </div>
  );
};

export default HomePage;