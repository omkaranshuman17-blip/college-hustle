import React from 'react';
const SleepAssessment: React.FC<any> = ({ onComplete, onBack }) => (
  <div className="card"><h2 className="text-2xl font-bold mb-4">Sleep Quality Assessment</h2><p>Coming soon...</p><button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-200 rounded">Back</button></div>
);
export default SleepAssessment;
