import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('https://sirevision-api.herokuapp.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setDescription(response.data.ai_description);
      alert(`Mined and uploaded: ${response.data.url}`);
    } catch (error) {
      alert(`Mine failed: ${error.response?.data?.error || 'Upload crashed'}`);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Sirevision Mine</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Mine & Upload</button>
      {description && <p>Mined Description: {description}</p>}
    </div>
  );
}

export default App;
