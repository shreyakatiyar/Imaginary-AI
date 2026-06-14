/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt, faImage, faWandMagicSparkles, faRocket,
  faArrowRight, faBars, faXmark, faLayerGroup,
  faPalette, faCode, faUsers, faStar,
} from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import Card1 from './Card1';

/* ── Animated counter ── */
const Counter = ({ target, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isFloat = target % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const value = (target * step) / steps;
      if (step >= steps) { setCount(target); clearInterval(timer); }
      else { setCount(value); }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, target]);

  const formatted = isFloat
    ? count.toFixed(1)
    : Math.floor(count).toLocaleString();

  return <span ref={ref}>{formatted}{suffix}</span>;
};

/* ── Animation variants ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ── Data ── */
const features = [
  { icon: faBolt,               title: 'Lightning Fast',     desc: 'AI responses delivered in seconds so your creative flow is never interrupted.' },
  { icon: faImage,              title: 'Stunning Visuals',   desc: 'Transform any prompt into photorealistic imagery with OpenJourney.' },
  { icon: faWandMagicSparkles,  title: 'Creative Freedom',   desc: 'No limits — explore any genre, style, or concept imaginable.' },
  { icon: faCode,               title: 'Simple Integration', desc: 'Built with a clean API — embed AI generation anywhere in your workflow.' },
  { icon: faPalette,            title: 'Style Control',      desc: 'Describe tone, aesthetic, and mood to fine-tune every output.' },
  { icon: faLayerGroup,         title: 'Multi-Format',       desc: 'Generate text for blogs or images for design — all from one platform.' },
];

const stats = [
  { icon: faUsers,              value: 10000,  label: 'Active Users',       suffix: '+' },
  { icon: faImage,              value: 50000,  label: 'Images Generated',   suffix: '+' },
  { icon: faStar,               value: 4.9,    label: 'Average Rating',     suffix: '/5' },
];

const steps = [
  { step: '01', title: 'Type Your Prompt',  desc: 'Describe what you want to create in plain, natural language.' },
  { step: '02', title: 'AI Generates',       desc: 'Our models process your idea and produce content instantly.' },
  { step: '03', title: 'Download & Use',     desc: 'Copy your text or download your image with a single click.' },
];

/* ── Component ── */
function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = 'Imagine AI — AI Text & Image Generation Tool';
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-950 text-white overflow-x-hidden"
    >
      {/* ── NAVBAR ── */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <Link to="/" className="text-xl font-black gradient-text tracking-tight">
          Imagine AI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/text"  className="text-slate-400 hover:text-white transition-colors font-medium">Text</Link>
          <Link to="/image" className="text-slate-400 hover:text-white transition-colors font-medium">Image</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/text">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl transition-colors"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-xl p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-6 py-5 flex flex-col gap-4 md:hidden"
          >
            <Link to="/text"  onClick={() => setMenuOpen(false)} className="text-slate-200 py-2 font-medium hover:text-white transition-colors">Text Generator</Link>
            <Link to="/image" onClick={() => setMenuOpen(false)} className="text-slate-200 py-2 font-medium hover:text-white transition-colors">Image Generator</Link>
            <Link to="/text"  onClick={() => setMenuOpen(false)}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-xl w-full transition-colors">
                Get Started
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="animated-gradient min-h-screen flex items-center justify-center px-6 pt-28 pb-20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              AI-Powered Creative Suite
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight"
          >
            Create Anything with{' '}
            <span className="gradient-text">Imagine AI</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Generate unique text and captivating images instantly. Your creative
            companion for every project — powered by state-of-the-art AI.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/text">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-colors pulse-glow"
              >
                Generate Text
                <FontAwesomeIcon icon={faArrowRight} />
              </motion.button>
            </Link>
            <Link to="/image">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all"
              >
                Generate Image
                <FontAwesomeIcon icon={faImage} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={fadeUp}
            className="mt-20 flex flex-col items-center gap-2 text-slate-600 text-sm"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 border-2 border-slate-700 rounded-full flex items-start justify-center pt-1"
            >
              <div className="w-1 h-2 bg-slate-600 rounded-full" />
            </motion.div>
            Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map(({ icon, value, label, suffix }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="glass-card bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={icon} className="text-blue-400 text-2xl" />
                </div>
                <div className="text-4xl font-black gradient-text mb-1">
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-slate-400 font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Why Choose <span className="gradient-text">Imagine AI</span>?
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Everything you need to unlock unlimited creative potential
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: 'rgba(59,130,246,0.5)' }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-default transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-blue-600/15 rounded-xl flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={icon} className="text-blue-400 text-xl" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-slate-400 text-xl">Three simple steps to creative freedom</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.14 }}
                className="text-center"
              >
                <div className="text-7xl font-black gradient-text mb-4 leading-none select-none">{step}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETING CARDS ── */}
      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight"
          >
            Built for <span className="gradient-text">Every Creator</span>
          </motion.h2>

          <div className="flex flex-col items-center gap-8">
            <Card
              text="Our tool is designed for creators of all kinds. Whether you're a marketer needing fresh content, a developer prototyping designs, or a student exploring AI-driven creativity, our generator adapts to your needs."
              imageUrl="https://www.ibm.com/blog/wp-content/uploads/2023/03/What-is-Generative-AI-what-are-Foundation-Models-and-why-do-they-matter-scaled.jpg"
            />
            <Card1
              text="Get started today and unleash your imagination with limitless possibilities. Join thousands of users who rely on our tool for their daily creative projects."
              imageUrl="https://media.licdn.com/dms/image/D4D12AQHlYO30JBr2vw/article-cover_image-shrink_600_2000/0/1709817807558?e=2147483647&v=beta&t=F6zXoOow6Dq7u2QaDjY6JFwinAB_rnr-s33sRKGt4cQ"
            />
            <Card
              text="With continuous updates and enhancements, we strive to provide you with the best tools to fuel your creativity. Explore our features and see why our users love the simplicity and effectiveness of our generator."
              imageUrl="https://cdn.sanity.io/images/tlr8oxjg/production/bfd288fd12e9e359425e1f5de3a817f029dd3d8e-1456x816.png?w=3840&q=100&fit=clip&auto=format"
            />
            <Card1
              text="Join our community of creators and start generating content that stands out. Our generator grows alongside you — from first experiment to professional workflow."
              imageUrl="https://cdn.analyticsvidhya.com/wp-content/uploads/2024/01/Generative-AI-on-the-Animation-Industry.jpg"
            />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6 animated-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 to-purple-950/60" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <FontAwesomeIcon icon={faRocket} />
            Start for free — no account needed
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Ready to <span className="gradient-text">Start Creating</span>?
          </h2>
          <p className="text-slate-300 text-xl mb-12 leading-relaxed">
            Join thousands of creators already using Imagine AI to bring their visions to life — absolutely free.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/text">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-colors"
              >
                Generate Text
              </motion.button>
            </Link>
            <Link to="/image">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-10 rounded-2xl text-lg backdrop-blur-sm transition-all"
              >
                Generate Image
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 border-t border-slate-800/60 px-6 md:px-10 py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="text-xl font-black gradient-text">Imagine AI</Link>
          <nav className="flex gap-6 text-slate-500 text-sm">
            <Link to="/"      className="hover:text-white transition-colors">Home</Link>
            <Link to="/text"  className="hover:text-white transition-colors">Text</Link>
            <Link to="/image" className="hover:text-white transition-colors">Image</Link>
          </nav>
          <p className="text-slate-600 text-sm">© 2024 Imagine AI. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
}

export default Home;
