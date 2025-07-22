// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import Text from './Text';
import ImageGen from './ImageGen';
import Home from './Home1';

Modal.setAppElement('#root');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text" element={<Text />} />
        <Route path="/image" element={<ImageGen />} />
      </Routes>
    </Router>
  );
};

export default App;
