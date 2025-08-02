import React from 'react';

export default function BarGraph({ options, responses }) {
  const maxVotes = Math.max(...options.map(opt => responses[opt] || 0), 1);

  return (
    <div className="space-y-2">
      {options.map((opt, idx) => {
        const count = responses[opt] || 0;
        const percent = Math.round((count / maxVotes) * 100);
        return (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span>{opt}</span>
              <span>{count} votes</span>
            </div>
            <div className="bg-gray-200 h-4 rounded">
              <div
                className="bg-indigo-600 h-4 rounded"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
