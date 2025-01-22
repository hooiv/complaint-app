// pages/register.js
import RegistrationForm from '../components/RegistrationForm';
import Link from 'next/link';

const RegisterPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <RegistrationForm />
       <div className="mt-4 text-center">
        <p>Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-700">Login</Link></p>
       </div>
      </div>
  </div>
);

export default RegisterPage;