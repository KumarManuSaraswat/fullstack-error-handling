// frontend/src/App.jsx
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(false);

  const testErrorHandling = async () => {
    setLoading(true);
    try {
      // Sending an empty object to trigger the "missing username" error
      const response = await axios.post('http://localhost:3000/api/submit', {});
      toast.success(response.data.message);
    } catch (error) {
      // Extracting the error message from the failed API response
      const errorMessage = error.response?.data?.message || 'An unexpected network error occurred';
      
      // Displaying the user-friendly error message
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Error Handling Milestone</h1>
      <p>Click the button below to trigger an intentionally failing API call.</p>
      
      <button 
        onClick={testErrorHandling} 
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'Submitting...' : 'Trigger API Error'}
      </button>

      {/* Global Toast Container */}
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default App;