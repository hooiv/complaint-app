// pages/login.js
import LoginForm from '../components/LoginForm';
import Link from 'next/link';

const LoginPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen ">
     <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
         <h1 className="text-2xl font-bold  text-center">Login</h1>
         <LoginForm />
         <div className="mt-4 text-center">
           <p>Don't have an account? <Link href="/register" className="text-blue-500 hover:text-blue-700">Register</Link></p>
       </div>
      </div>
  </div>
);

export default LoginPage;