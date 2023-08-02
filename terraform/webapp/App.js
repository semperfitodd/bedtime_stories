import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState('');
  const [subject, setSubject] = useState('sports');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const subjects = ['sports', 'sci-fi', 'action', 'video games'];

  const handleStoryCreation = async () => {
    setLoading(true);
    try {
      const url = '<API_INVOKE_URL>/stories';
      const payload = {
        characters: characters.split(',').map(c => c.trim()),
        subject
      };
      // Including headers in the request
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = response.data;
      setStory(responseData.story); // Accessing the story field inside the body
    } catch (error) {
      console.error('Error creating story:', error);
      setStory('An error occurred while creating the story.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Kai's Stories</h1>
      <div>
        <input
          type="text"
          placeholder="Enter characters, comma separated"
          value={characters}
          onChange={e => setCharacters(e.target.value)}
        />
        <select value={subject} onChange={e => setSubject(e.target.value)}>
          {subjects.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button onClick={handleStoryCreation}>Create Story</button>
      </div>
      {loading ? (
        <p>Creating Story...</p>
      ) : (
        <div>
          <h2>Story:</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}

export default App;
