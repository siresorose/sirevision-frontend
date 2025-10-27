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
      alert(`File uploaded with norules AI: ${response.data.url}`);
    } catch (error) {
      alert(`Error: ${error.response?.data?.error || 'Upload failed'}`);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Sirevision NoRules AI</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Analyze NoRules</button>
      {description && <p>NoRules AI Description: {description}</p>}
    </div>
  );
}

export default App;
