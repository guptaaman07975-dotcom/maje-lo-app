import React from 'react';

interface VisualizerProps {
  isActive: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isActive }) => {
  if (!isActive) {
    return (
      <div className="h-[60px] flex items-center justify-center text-gray-500 text-sm">
        Voice Inactive
      </div>
    );
  }

  // Create 10 bars with random delays for a convincing effect without complex canvas analysis for this demo
  return (
    <div className="visualizer-container">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="bar"
          style={{
            height: `${Math.random() * 50 + 20}%`,
            animationDuration: `${0.4 + Math.random() * 0.4}s`,
            backgroundColor: i % 2 === 0 ? '#818cf8' : '#c084fc'
          }}
        />
      ))}
    </div>
  );
};

export default Visualizer;