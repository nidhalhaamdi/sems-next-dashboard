import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const JWTTokens = () => {
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  return (
    <AdminLayout>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold text-secondary mb-4">Generate Tokens</h1>
        <div className="flex items-center mb-4">
          <label className="mr-2 text-lg font-medium">Set Expiration Date</label>
          <DatePicker
            selected={expirationDate}
            onChange={(date: Date | null) => setExpirationDate(date)}
            className="p-2 border border-gray-300 rounded"
            dateFormat="yyyy-MM-dd"
          />
          <button className="ml-4 px-4 py-2 bg-accent text-white rounded hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-highlight">
            Create Tokens
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default JWTTokens;
