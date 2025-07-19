import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({ predictions: 0, feedback: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      // Fetch summary stats from backend
      fetch(`/api/dashboard-summary?userId=${userObj.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setSummary({ predictions: data.predictions, feedback: data.feedback });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">Dashboard</h1>
        {user && <div className="text-lg">Welcome, <span className="font-semibold">{user.username}</span>!</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/history" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="text-2xl font-bold text-blue-600">
                {loading ? <span className="animate-pulse">...</span> : summary.predictions}
              </div>
              <div className="text-gray-600">Total Predictions</div>
              <div className="mt-2 text-sm text-blue-500">View History →</div>
            </div>
          </Link>
          
          <Link to="/feedback" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="text-2xl font-bold text-purple-600">
                {loading ? <span className="animate-pulse">...</span> : summary.feedback}
              </div>
              <div className="text-gray-600">Feedback Submitted</div>
              <div className="mt-2 text-sm text-purple-500">Submit Feedback →</div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/predict"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              New Prediction
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              View Recent History
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 