import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from '../components/Footer';
//import DeviceHive from 'devicehive';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'mock-token');
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  
  //   try {
  //     // Initialize DeviceHive with the provided credentials
  //     const deviceHive = new DeviceHive({
  //       login,
  //       password,
  //       mainServiceURL: process.env.NEXT_PUBLIC_DEVICEHIVE_MAIN_SERVICE_URL,
  //       authServiceURL: process.env.NEXT_PUBLIC_DEVICEHIVE_AUTH_SERVICE_URL,
  //       pluginServiceURL: process.env.NEXT_PUBLIC_DEVICEHIVE_PLUGIN_SERVICE_URL,
  //     });
  
  //     // Connect to DeviceHive
  //     await deviceHive.connect();
  
  //     // Store the DeviceHive instance in localStorage (or state management)
  //     localStorage.setItem('deviceHive', JSON.stringify(deviceHive));
  
  //     // Redirect to the admin dashboard
  //     router.push('/admin');
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //     alert('Invalid credentials or connection error');
  //   }
  // };

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
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
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
