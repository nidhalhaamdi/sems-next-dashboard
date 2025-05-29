// src/pages/admin/jwTokens/create.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createToken } from '@/api/tokens';
import { refreshAccessToken } from '@/api/auth';

const CreateJWToken = () => {
  const router = useRouter();
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!expirationDate) {
      setError('Please select an expiration date.');
      return;
    }

    try {
      setError('');
      const token = await refreshAccessToken();
      const isoDate = expirationDate.toISOString();

      const payload = {
        networkIds: [],           // optionally add network IDs here
        deviceTypeIds: [],        // optionally add device type IDs here
        expiration: isoDate,
        refreshExpiration: isoDate,
      };

      const result = await createToken(payload, token);

      // Redirect to details view
      router.push(`/admin/jwTokens/${encodeURIComponent(result.accessToken)}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create token.');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Create New JWT Token</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiration Date
          </label>
          <DatePicker
            selected={expirationDate}
            onChange={(date: Date | null) => setExpirationDate(date)}
            className="w-full p-2 border border-gray-300 rounded"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-accent text-white rounded hover:bg-highlight"
        >
          Generate Token
        </button>
      </div>
    </AdminLayout>
  );
};

export default CreateJWToken;
