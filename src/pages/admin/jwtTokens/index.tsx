import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createToken, getAllTokens } from '@/api/tokens';
import { refreshAccessToken } from '@/api/auth';
import Link from 'next/link';

const JWTTokens = () => {
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [tokenList, setTokenList] = useState<any[]>([]);
  const [error, setError] = useState('');

  const fetchTokens = async () => {
    try {
      const token = await refreshAccessToken();
      const tokens = await getAllTokens(token);
      setTokenList(tokens);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tokens');
    }
  };

  const handleCreateToken = async () => {
    if (!expirationDate) {
      setError('Please select an expiration date.');
      return;
    }

    try {
      const token = await refreshAccessToken();
      const isoDate = expirationDate.toISOString();

      const payload = {
        networkIds: [],
        deviceTypeIds: [],
        expiration: isoDate,
        refreshExpiration: isoDate,
      };

      await createToken(payload, token);
      setExpirationDate(null);
      fetchTokens();
    } catch (err: any) {
      setError(err.message || 'Token creation failed');
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Generate Tokens</h1>
        <div className="flex items-center mb-4">
          <label className="mr-2 text-lg font-medium">Set Expiration Date</label>
          <DatePicker
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
            className="p-2 border border-gray-300 rounded"
            dateFormat="yyyy-MM-dd"
          />
          <button
            onClick={handleCreateToken}
            className="ml-4 px-4 py-2 bg-accent text-white rounded hover:bg-highlight"
          >
            Create Tokens
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <h2 className="text-xl font-semibold mt-8 mb-2">Token List</h2>
        <div className="bg-white shadow rounded p-4">
          {tokenList.length === 0 ? (
            <p>No tokens generated yet.</p>
          ) : (
            <ul className="list-disc ml-5 space-y-2">
              {tokenList.map((t, index) => (
                <li key={index}>
                  <Link href={`/admin/jwTokens/${t.accessToken}`}>
                    <span className="text-blue-600 underline break-all">
                      {t.accessToken}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default JWTTokens;
