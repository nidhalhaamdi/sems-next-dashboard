import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from '../components/Footer';
import { loginUser } from '../api/auth';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { refreshToken } = await loginUser(login, password);
      sessionStorage.setItem('refreshToken', refreshToken);
      router.push('/admin');
    } catch (error: any) {
      alert(error.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 rounded-lg shadow-md">
          <div className="flex justify-center">
            <Image src="/sw-logo.png" alt="SWATEK Logo" width={150} height={150} />
          </div>
          <h1 className="text-2xl font-bold text-center text-accent">SEMS Admin Panel Login</h1>
          <p className="text-center text-secondary">
            Smart Energy Management System by SWATEK
          </p>
          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Username"
              className="w-full p-3 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              required
            />
            <button
              type="submit"
              className="w-full p-3 text-white bg-accent rounded-md hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;