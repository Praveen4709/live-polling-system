import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Teacher from './pages/Teacher';
import Student from './pages/Student';

export default function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen font-sans">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </div>
    </Router>
  );
}