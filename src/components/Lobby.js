import React from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css';

function Lobby({ codeBlocks }) {
  return (
    <div className="lobby">
      <h1>Choose code block</h1>
      <ul className="code-blocks">
        {codeBlocks.map(block => (
          <li key={block.id} className="code-block-item">
            <Link to={`/codeblock/${block.id}`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;
