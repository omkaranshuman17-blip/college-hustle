import React from 'react';
import { Link } from 'react-router-dom';

const TestComponent: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Navigation Links</h1>
      <div className="space-y-2">
        <div>
          <Link to="/resources" className="text-blue-600 underline">
            Go to Psychoeducational Hub
          </Link>
        </div>
        <div>
          <Link to="/support" className="text-green-600 underline">
            Go to Peer Support Platform
          </Link>
        </div>
        <div>
          <Link to="/dashboard" className="text-purple-600 underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
