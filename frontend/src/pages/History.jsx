import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    fetch(`/api/history?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setHistory(data.history);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">Prediction History</h1>
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div>Loading...</div>
          ) : history.length === 0 ? (
            <div className="text-gray-500">No history found.</div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Top Disease</th>
                  <th className="px-4 py-2 text-left">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">{new Date(item.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2">{item.results[0]?.disease || '-'}</td>
                    <td className="px-4 py-2">{item.results[0]?.confidence ? (item.results[0].confidence * 100).toFixed(1) + '%' : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History; 