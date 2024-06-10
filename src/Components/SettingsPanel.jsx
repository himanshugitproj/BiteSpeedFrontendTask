// src/SettingsPanel.js
import React from 'react';

const SettingsPanel = ({ node, onChange }) => {
  return (
    <div className="settings-panel">
      <input
        type="text"
        value={node.data.label}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SettingsPanel;