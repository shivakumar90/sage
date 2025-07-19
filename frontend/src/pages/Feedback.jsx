import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Feedback = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    fetch(`/api/history?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setHistory(data.history);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !selected || feedback === null) return;
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        predictionId: selected,
        feedback,
        comment,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Feedback submitted! Redirecting to dashboard...');
      setSelected('');
      setFeedback(null);
      setComment('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } else {
      setMessage('Error submitting feedback.');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">Submit Feedback</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Select Prediction</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selected}
                onChange={e => setSelected(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                {history
                  .filter(item => !item.feedbackGiven)
                  .map(item => (
                    <option key={item._id} value={item._id}>
                      {new Date(item.timestamp).toLocaleString()} - {item.results[0]?.disease || '-'}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Was the prediction accurate?</label>
              <div className="flex space-x-4">
                <button type="button" className={`px-4 py-2 rounded ${feedback === true ? 'bg-green-500 text-white' : 'bg-gray-200'}`} onClick={() => setFeedback(true)}>
                  👍 Yes
                </button>
                <button type="button" className={`px-4 py-2 rounded ${feedback === false ? 'bg-red-500 text-white' : 'bg-gray-200'}`} onClick={() => setFeedback(false)}>
                  👎 No
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Comments (optional)</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Submit Feedback</button>
            {message && <div className="mt-2 text-center text-green-600">{message}</div>}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback; 