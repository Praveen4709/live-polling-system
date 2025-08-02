import React, { useEffect, useState } from 'react';
import socket from '../socket';

export default function Student() {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('');
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    socket.on('new-poll', data => {
      setQuestion(data.question);
      setOptions(data.options);
      setSelected('');
      setVoted(false);
    });
  }, []);

  const submitVote = () => {
    socket.emit('submit-vote', { option: selected });
    setVoted(true);
  };

  if (!question) {
    return <div className="text-center mt-20 text-gray-500">Wait for the teacher to ask questions...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Question</h1>
      <h2 className="text-lg font-semibold mb-4">{question}</h2>

      {options.map((opt, idx) => (
        <div key={idx} className="mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pollOption"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              disabled={voted}
            />
            {opt}
          </label>
        </div>
      ))}

      {!voted && (
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded mt-4"
          onClick={submitVote}
          disabled={!selected}
        >
          Submit Vote
        </button>
      )}
      {voted && <p className="text-green-600 mt-4">Thanks for voting!</p>}
    </div>
  );
}
