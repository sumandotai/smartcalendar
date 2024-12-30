import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Calendar } from './components/Calendar';
import { DateView } from './components/DateView';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F1F0E8]">
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/date/:date" element={<DateView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;