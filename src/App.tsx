import React from 'react';
import Home from '@/pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 flex justify-center items-center">

      <div className="w-full max-w-4xl p-8 bg-transparent rounded-lg">
      <h1 className="text-4xl font-semibold text-emerald-800 mb-6 text-center">

          GitHub Profile Analyzer
        </h1>
        <Home />
      </div>
    </div>
  );
}

export default App;
