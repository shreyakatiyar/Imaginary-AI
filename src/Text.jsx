import { useState, useEffect } from 'react';
import { requestGroqAi } from './utils/groq';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane, faSpinner, faCopy, faCheck,
  faTrash, faArrowLeft, faExclamationCircle,
  faRotate, faDownload, faShareNodes,
  faLightbulb, faXmark, faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const SKELETON_WIDTHS = [100, 88, 95, 72, 83, 90, 60, 78, 94, 65];

const PROMPT_SUGGESTIONS = [
  {
    category: 'Writing',
    prompts: [
      'Write a short story about a time traveler who visits the year 3000',
      'Create a compelling product description for a smart AI-powered watch',
      'Write a professional cover letter template for a software engineer',
    ],
  },
  {
    category: 'Creative',
    prompts: [
      'Suggest 10 unique business name ideas for an AI startup',
      'Write a catchy tagline for a sustainable fashion brand',
      'Generate a haiku about artificial intelligence',
    ],
  },
  {
    category: 'Technical',
    prompts: [
      'Explain how neural networks work in simple terms',
      'Write a README template for an open-source React project',
      'List the 5 most important REST API design best practices',
    ],
  },
  {
    category: 'Learning',
    prompts: [
      'Explain the difference between supervised and unsupervised learning',
      'What are the SOLID principles in software engineering?',
      'Give me a 30-day study plan for learning TypeScript',
    ],
  },
];

const Text = () => {
  const [prompt, setPrompt]         = useState('');
  const [data, setData]             = useState('');
  const [showData, setShowData]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg]     = useState('');
  const [copied, setCopied]         = useState(false);
  const [isSuggestOpen, setSuggest] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [history, setHistory]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('imgai_history') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    document.title = 'Text Generator — Imagine AI';
  }, []);

  const runGenerate = async (text) => {
    setLoading(true);
    setShowData(false);
    try {
      const ai = await requestGroqAi(text);
      setData(ai);
      setShowData(true);
      const next = [text, ...history.filter(h => h !== text)].slice(0, 8);
      setHistory(next);
      localStorage.setItem('imgai_history', JSON.stringify(next));
    } catch {
      setErrorMsg('Something went wrong. Check your connection and try again.');
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!prompt.trim()) {
      setErrorMsg('Please enter a prompt before generating.');
      setErrorOpen(true);
      return;
    }
    runGenerate(prompt.trim());
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleExport = () => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imagine-ai-response.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => { setPrompt(''); setData(''); setShowData(false); };

  const wordCount = data.trim() ? data.trim().split(/\s+/).length : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-slate-950 text-white flex flex-col"
    >
      {/* ── Sticky nav ── */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/60 px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Home
        </Link>

        <h1 className="text-base font-black gradient-text">Text Generator</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSuggest(true)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-3 py-2 rounded-xl transition-colors text-sm"
        >
          <FontAwesomeIcon icon={faLightbulb} />
          <span className="hidden sm:inline">Ideas</span>
        </motion.button>
      </header>

      {/* ── Body ── */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        >

          {/* ── Card header ── */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-800">
            <h2 className="text-2xl font-black gradient-text">Text Generator</h2>
            <p className="text-slate-500 text-xs mt-1">
              Powered by Llama 3.1 &nbsp;·&nbsp;
              <kbd className="bg-slate-800 border border-slate-700 text-slate-400 px-1 py-0.5 rounded text-xs font-mono">Ctrl</kbd>
              {' '}+{' '}
              <kbd className="bg-slate-800 border border-slate-700 text-slate-400 px-1 py-0.5 rounded text-xs font-mono">Enter</kbd>
              {' '}to generate
            </p>
          </div>

          {/* ── Input area ── */}
          <div className="px-6 pt-5">

            {/* History chips */}
            <AnimatePresence>
              {history.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="overflow-hidden mb-3"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1 text-slate-600 text-xs whitespace-nowrap">
                      <FontAwesomeIcon icon={faClockRotateLeft} className="text-xs" />
                      Recent:
                    </span>
                    {history.slice(0, 4).map((h, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setPrompt(h)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-full border border-slate-700 max-w-[160px] truncate transition-colors"
                        title={h}
                      >
                        {h.length > 24 ? h.slice(0, 24) + '…' : h}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything… What would you like to create today?"
                className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 text-white placeholder-slate-500 rounded-2xl py-4 px-5 text-sm resize-none h-32 outline-none transition-colors duration-200"
              />
              <span className="absolute bottom-3 right-4 text-slate-600 text-xs select-none">
                {prompt.length}
              </span>
            </div>

            {/* Action row */}
            <div className="flex items-center gap-2.5 mt-4 pb-5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleClear}
                disabled={!prompt && !showData}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-25 disabled:cursor-not-allowed text-slate-300 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                <FontAwesomeIcon icon={faTrash} />
                <span className="hidden sm:inline">Clear</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSuggest(true)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                <FontAwesomeIcon icon={faLightbulb} />
                <span className="hidden sm:inline">Ideas</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Generating…
                  </>
                ) : (
                  <>
                    Generate
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* ── Result — appears below input in same card ── */}
          <AnimatePresence>

            {/* Loading skeleton */}
            {loading && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-slate-800"
              >
                <div className="px-6 py-5">
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                    />
                    <span className="text-slate-400 text-sm font-medium">Thinking…</span>
                  </div>
                  <div className="space-y-3">
                    {SKELETON_WIDTHS.map((w, i) => (
                      <div
                        key={i}
                        className="shimmer h-3.5 rounded-lg"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Response */}
            {!loading && showData && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="border-t border-slate-800 overflow-hidden"
              >
                {/* Result toolbar */}
                <div className="flex items-center justify-between px-6 py-3 bg-slate-800/40 flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-slate-300 text-sm font-semibold">Response</span>
                    <span className="text-slate-600 text-xs">{wordCount} words</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Retry */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => prompt.trim() && runGenerate(prompt.trim())}
                      className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 py-1.5 px-3 rounded-lg transition-colors"
                      title="Regenerate"
                    >
                      <FontAwesomeIcon icon={faRotate} />
                      <span className="hidden sm:inline">Retry</span>
                    </motion.button>
                    {/* Export */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleExport}
                      className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 py-1.5 px-3 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faDownload} />
                      <span className="hidden sm:inline">Export</span>
                    </motion.button>
                    {/* Share */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShareOpen(true)}
                      className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 py-1.5 px-3 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faShareNodes} />
                      <span className="hidden sm:inline">Share</span>
                    </motion.button>
                    {/* Copy */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className={`flex items-center gap-1 text-xs py-1.5 px-3 rounded-lg transition-colors font-medium ${
                        copied
                          ? 'bg-green-600/20 border border-green-500/40 text-green-400'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      }`}
                    >
                      <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                      {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </div>
                </div>

                {/* Syntax-highlighted output */}
                <SyntaxHighlight
                  language="markdown"
                  style={dracula}
                  wrapLongLines={true}
                  customStyle={{
                    margin: 0,
                    padding: '24px',
                    fontSize: '13.5px',
                    lineHeight: '1.8',
                    background: '#0f172a',
                    maxHeight: '520px',
                    overflowY: 'auto',
                  }}
                >
                  {data}
                </SyntaxHighlight>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card footer */}
          <div className="px-6 py-3 border-t border-slate-800/50">
            <p className="text-slate-700 text-xs text-center select-none">
              Ctrl + Enter to generate &nbsp;·&nbsp; Responses generated by Llama 3.1
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Error Modal ── */}
      <Modal isOpen={isErrorOpen} onRequestClose={() => setErrorOpen(false)} className="modal" overlayClassName="overlay">
        <motion.div initial={{ opacity: 0, scale: 0.88, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.22 }}>
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Hold on!</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{errorMsg}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorOpen(false)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Got it
          </button>
        </motion.div>
      </Modal>

      {/* ── Prompt Suggestions Modal ── */}
      <Modal isOpen={isSuggestOpen} onRequestClose={() => setSuggest(false)} className="modal" overlayClassName="overlay">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500" />
              Prompt Ideas
            </h2>
            <button onClick={() => setSuggest(false)} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="space-y-5 max-h-[380px] overflow-y-auto pr-1">
            {PROMPT_SUGGESTIONS.map(({ category, prompts: items }) => (
              <div key={category}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{category}</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ x: 5 }}
                      onClick={() => { setPrompt(item); setSuggest(false); }}
                      className="w-full text-left text-sm text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-300 transition-all leading-snug"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Modal>

      {/* ── Share Modal ── */}
      <Modal isOpen={isShareOpen} onRequestClose={() => setShareOpen(false)} className="modal" overlayClassName="overlay">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faShareNodes} className="text-blue-500" />
              Share Response
            </h2>
            <button onClick={() => setShareOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { handleCopy(); setShareOpen(false); }}
              className="w-full flex items-center gap-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 font-medium py-3.5 px-4 rounded-xl transition-all text-sm"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faCopy} className="text-blue-600 text-sm" />
              </div>
              Copy text to clipboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { handleExport(); setShareOpen(false); }}
              className="w-full flex items-center gap-3 bg-slate-50 hover:bg-green-50 border border-slate-200 hover:border-green-300 text-slate-700 font-medium py-3.5 px-4 rounded-xl transition-all text-sm"
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={faDownload} className="text-green-600 text-sm" />
              </div>
              Download as .txt file
            </motion.button>
          </div>
          <p className="text-slate-400 text-xs text-center mt-4">
            {wordCount} words · {data.length} characters
          </p>
        </motion.div>
      </Modal>
    </motion.div>
  );
};

export default Text;
