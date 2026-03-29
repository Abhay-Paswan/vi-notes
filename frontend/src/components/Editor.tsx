import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Editor.css';

const Editor: React.FC = () => {
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersLight ? 'light' : 'dark');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="editor-layout">
      <header className="editor-header">
        <h1 className="editor-title">Vi-Notes</h1>
        <div className="editor-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <div className="editor-container">
        <textarea
          className="editor-textarea"
          value={content}
          onChange={handleChange}
          placeholder="Start writing..."
          autoFocus
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default Editor;
