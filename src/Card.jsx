import { motion } from 'framer-motion';

const Card = ({ text, imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    whileHover={{ y: -6 }}
    className="flex flex-col md:flex-row items-center bg-slate-800 border border-slate-700 hover:border-blue-600/50 rounded-2xl overflow-hidden w-full max-w-4xl shadow-xl transition-colors duration-300"
  >
    <div className="flex-1 p-8">
      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">{text}</p>
      <span className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer transition-colors text-sm">
        Read more →
      </span>
    </div>

    <div className="md:w-72 w-full h-52 md:h-full flex-shrink-0 overflow-hidden">
      <motion.img
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.4 }}
        src={imageUrl}
        alt="Feature visual"
        className="w-full h-full object-cover"
      />
    </div>
  </motion.div>
);

export default Card;
