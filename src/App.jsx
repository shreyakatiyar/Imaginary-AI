import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import Text from './Text';
import ImageGen from './ImageGen';
import Home from './Home1';
import NotFound from './NotFound';

Modal.setAppElement('#root');

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"      element={<Home />} />
        <Route path="/text"  element={<Text />} />
        <Route path="/image" element={<ImageGen />} />
        <Route path="*"      element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <AnimatedRoutes />
  </Router>
);

export default App;
