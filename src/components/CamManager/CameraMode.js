import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Favorite, Star, ThumbUp } from '@mui/icons-material';
import './Layout.css';
import Icon1 from './Icon1';
import Icon2 from './Icon2';
import Icon3 from './Icon3';

const CameraMode = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedObject, setSelectedObject] = useState(1);

  const handleHover = () => {
    setIsExpanded(true);
  };

  const handleHoverExit = () => {
    setIsExpanded(false);
  };

  const handleObjectSelect = (objectId) => {
    setSelectedObject(objectId);
  };

  return (
    <div
        className={`layout-container ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverExit}
      >
        <div className={`object ${isExpanded ? 'visible' : ''}`}>
          <IconButton
            className={`object-icon ${selectedObject === 1 ? 'selected' : ''}`}
            onClick={() => handleObjectSelect(1)}
          >
            <Icon1 />
          </IconButton>
        </div>
        <div className={`object ${isExpanded ? 'visible' : ''}`}>
          <IconButton
            className={`object-icon ${selectedObject === 2 ? 'selected' : ''}`}
            onClick={() => handleObjectSelect(2)}
          >
            <Icon2 />
          </IconButton>
        </div>
        <div className={`object ${isExpanded ? 'visible' : ''}`}>
          <IconButton
            className={`object-icon ${selectedObject === 3 ? 'selected' : ''}`}
            onClick={() => handleObjectSelect(3)}
          >
            <Icon3 />
          </IconButton>
        </div>
        {selectedObject && !isExpanded && (
          <div className={`selected-object ${selectedObject === 1 ? 'selected' : ''}`}>
            {selectedObject === 1 && <Icon1 />}
            {selectedObject === 2 && <Icon2 />}
            {selectedObject === 3 && <Icon3 />}
          </div>
        )}
      </div>

  );
};

export default CameraMode;
