import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import './styles.css';

const Header = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/admin');
  };

  return (
    <header className="w-full h-50 bg-transparent text-white flex items-center justify-between px-20 shadow-md shadow-primary-secondary-900/5">
      <div className="flex items-center" onClick={handleLogoClick}>
        <Image
          src="/sw-logo.png"
          alt="SWATEK Logo"
          width={140}
          height={140}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className="flex items-center justify-center flex-1">
        <h1 className="text-3xl font-semibold text-secondary title-font">Smart Energy Management System's ADMIN PANEL</h1>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            sessionStorage.removeItem('refreshToken');
            // You can also remove accessToken if stored
            // sessionStorage.removeItem('accessToken');
            window.location.href = '/login';
          }}
          className="px-4 py-2 bg-accent rounded-md hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;