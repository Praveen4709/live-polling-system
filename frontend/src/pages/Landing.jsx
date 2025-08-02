import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="text-indigo-600 text-sm font-semibold">#LivePoll</h2>
      <h1 className="text-3xl font-bold mt-2">Welcome to the Live Polling System</h1>
      <p className="mt-2 text-gray-600">Please select the role best describes you to begin using the polling system.</p>

      <div className="flex gap-4 mt-8">
        <button
          className={`border px-6 py-4 rounded-lg w-48 shadow-sm text-left ${role === 'student' ? 'border-indigo-600' : 'border-gray-300'}`}
          onClick={() => setRole('student')}
        >
          <h4 className="font-semibold">I'm a Student</h4>
          <p className="text-sm text-gray-500">Join polls, answer questions, and view results.</p>
        </button>
        <button
          className={`border px-6 py-4 rounded-lg w-48 shadow-sm text-left ${role === 'teacher' ? 'border-indigo-600' : 'border-gray-300'}`}
          onClick={() => setRole('teacher')}
        >
          <h4 className="font-semibold">I'm a Teacher</h4>
          <p className="text-sm text-gray-500">Create and manage live polls.</p>
        </button>
      </div>

      <button
        className="mt-6 bg-indigo-600 text-white px-8 py-2 rounded disabled:opacity-50"
        disabled={!role}
        onClick={() => navigate(`/${role}`)}
      >
        Continue
      </button>
    </div>
  );
}
