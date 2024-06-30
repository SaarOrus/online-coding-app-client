import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import './CodeEditor.css';

const socket = io('http://localhost:3000');

function CodeEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    socket.emit('join', { blockId: id });

    const handleRole = ({ role, block }) => {
      setRole(role);
      setTitle(block.title);
      setCode(block.incorrectCode);
    };

    const handleCodeUpdate = ({ code, isCorrect }) => {
      setCode(code);
      setIsCorrect(isCorrect);
    };

    socket.on('role', handleRole);
    socket.on('codeUpdate', handleCodeUpdate);

    return () => {
      socket.emit('leave', { role, blockId: id });
      socket.off('role', handleRole);
      socket.off('codeUpdate', handleCodeUpdate);
    };
  }, [id]);

  useEffect(() => {
    hljs.highlightAll();
  }, [code]);

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit('codeChange', { code: newCode, blockId: id });
  };

  const handleBack = () => {
    socket.emit('leave', { role, blockId: id });
    setRole(null);
    navigate('/');
  };

  return (
    <div>
      <h1>{title}</h1>
      {role === 'mentor' ? (
        <pre>
          <code className="language-javascript">
            {code}
          </code>
        </pre>
      ) : (
        <div className="editor-container">
          <textarea
            value={code}
            onChange={handleChange}
            style={{ width: '100%', height: '400px' }}
          />
          {isCorrect && <div className="smiley-face">😃</div>}
        </div>
      )}
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default CodeEditor;
