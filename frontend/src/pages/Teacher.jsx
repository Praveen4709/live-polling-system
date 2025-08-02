import React, { useState, useEffect } from 'react';
import socket from '../socket';
import BarGraph from '../components/BarGraph';

export default function Teacher() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
    });

    socket.on('poll-response', data => {
      setResponses(prev => ({ ...prev, [data.option]: (prev[data.option] || 0) + 1 }));
    });

    return () => {
      socket.off('poll-response');
    };
  }, []);

  const sendPoll = () => {
    if (!question.trim() || options.some(opt => !opt.trim())) {
      alert('Please fill in the question and all options.');
      return;
    }

    const cleanedOptions = options.filter(opt => opt.trim());
    console.log('Sending poll:', { question, options: cleanedOptions });
    socket.emit('send-poll', { question, options: cleanedOptions });
    setResponses({});
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Let's Get Started</h1>
      <input
        className="w-full p-3 border rounded mb-4"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Enter your question"
      />
      {options.map((opt, idx) => (
        <input
          key={idx}
          className="w-full p-2 border rounded mb-2"
          value={opt}
          onChange={e => {
            const newOptions = [...options];
            newOptions[idx] = e.target.value;
            setOptions(newOptions);
          }}
          placeholder={`Option ${idx + 1}`}
        />
      ))}
      <button
        className="text-indigo-600 text-sm mb-4"
        onClick={() => setOptions([...options, ''])}
      >
        + Add More Option
      </button>
      <button className="bg-indigo-600 text-white px-6 py-2 rounded" onClick={sendPoll}>Ask Question</button>

      {Object.keys(responses).length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Results:</h2>
          <BarGraph options={options} responses={responses} />
        </div>
      )}
    </div>
  );
}