import React, { useState } from 'react';
import './Editor.css';

const Editor: React.FC = () => {
  const [content, setContent] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
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
  );
};

export default Editor;
