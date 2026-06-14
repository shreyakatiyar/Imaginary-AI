import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 — Page Not Found | Imagine AI';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen animated-gradient flex flex-col items-center justify-center text-white text-center px-6 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 90, damping: 14 }}
        className="text-[160px] md:text-[200px] font-black gradient-text leading-none float-animation select-none"
      >
        404
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-4 -mt-4"
      >
        Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="text-slate-400 mb-10 max-w-md text-lg leading-relaxed"
      >
        This page has wandered off into the digital void. Let&apos;s get you back to creating something amazing.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Home
          </motion.button>
        </Link>
        <Link to="/text">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 backdrop-blur-sm transition-all"
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Start Creating
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
