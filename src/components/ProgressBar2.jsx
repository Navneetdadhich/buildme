import '../App.css'
import { useState } from 'react';
const ProgressBar2 = ({ progress, sectionProgress }) => {
    const [showDetails, setShowDetails] = useState(false);
  
    return (
      <div className="progress-container rounded-lg mr-5 p-3">
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div 
          className="progress-text"
          onClick={() => setShowDetails(!showDetails)}
          style={{ cursor: 'pointer' }}
        >
          Overall Progress: {progress}% {showDetails ? '▼' : '▲'}
        </div>
        {showDetails && (
          <div className="section-progress ">
            {Object.entries(sectionProgress).map(([section, progress]) => (
              <div key={section} className="section-item">
                <span>{section}: </span>
                <span>{progress}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default ProgressBar2;