import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lobby from './components/Lobby';
import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/codeblocks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCodeBlocks(data);
      } catch (error) {
        console.error('Error fetching code blocks:', error);
      }
    };

    fetchCodeBlocks();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Lobby codeBlocks={codeBlocks} />} />
        <Route path="/codeblock/:id" element={<CodeEditor />} />
      </Routes>
    </div>
  );
}

export default App;
