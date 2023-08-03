import React, { useState, useRef } from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState('');
  const [subject, setSubject] = useState('sports');
  const [story, setStory] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const subjects = ['sports', 'sci-fi', 'action', 'video games'];

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleStoryCreation = async () => {
    setLoading(true);
    try {
      const url = '<INVOKE_URL>/stories';
      const payload = {
        characters: characters.split(',').map(c => c.trim()),
        subject
      };
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = response.data;
      setStory(responseData.story);
      setAudioUrl(responseData.url);
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
          {audioUrl && (
            <div>
              <button onClick={handlePlayAudio} className="play-story-button">Play Story</button>
              <audio ref={audioRef} controls>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
