import { useState, useEffect } from 'react';
import './ImageGen.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload, faExpand, faArrowLeft, faImage,
  faXmark, faExclamationCircle, faPalette,
  faSliders, faClockRotateLeft, faTrash,
  faChevronDown, faChevronUp, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');

/* ── Style presets ── */
const STYLE_PRESETS = [
  { label: 'Photorealistic', emoji: '📷', value: 'photorealistic, ultra detailed, 8k resolution, professional photography, sharp focus' },
  { label: 'Anime',          emoji: '🎌', value: 'anime style, Studio Ghibli inspired, vibrant colors, detailed illustration, cel-shaded' },
  { label: 'Oil Painting',   emoji: '🖼️', value: 'oil painting, impressionist style, textured brushstrokes, fine art, museum quality' },
  { label: 'Cyberpunk',      emoji: '🌆', value: 'cyberpunk aesthetic, neon lights, futuristic city, dark atmosphere, blade runner style' },
  { label: 'Watercolor',     emoji: '🎨', value: 'watercolor painting, soft pastel colors, artistic, gentle washes, flowing pigment' },
  { label: 'Pixel Art',      emoji: '👾', value: 'pixel art, retro 16-bit style, vibrant palette, game art, isometric' },
  { label: 'Pencil Sketch',  emoji: '✏️', value: 'detailed pencil sketch, hand-drawn, fine linework, graphite, hatching shading' },
  { label: 'Fantasy',        emoji: '🐉', value: 'epic fantasy art, magical atmosphere, dramatic lighting, artstation trending, concept art' },
];

const ImageGen = () => {
  const [prompt, setPrompt]         = useState('');
  const [negPrompt, setNegPrompt]   = useState('');
  const [image, setImage]           = useState(null);
  const [imgHistory, setImgHistory] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [activeStyle, setStyle]     = useState(null);
  const [showAdvanced, setAdvanced] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg]     = useState('');
  const [isPreviewOpen, setPreview] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isStyleOpen, setStyleOpen] = useState(false);

  useEffect(() => {
    document.title = 'Image Generator — Imagine AI';
  }, []);

  const buildPrompt = () => {
    const parts = [prompt.trim()];
    if (activeStyle) parts.push(activeStyle.value);
    return parts.join(', ');
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      setErrorMsg('Please describe the image you want to generate.');
      setErrorOpen(true);
      return;
    }
    try {
      setLoading(true);

      const fullPrompt = buildPrompt();
      const seed = Date.now() % 1000000;

      // Build Pollinations.ai URL — free, no API key, powered by FLUX
      const params = new URLSearchParams({
        width:   '1024',
        height:  '1024',
        model:   'flux',
        nologo:  'true',
        enhance: 'true',
        seed:    String(seed),
      });
      if (negPrompt.trim()) params.set('negative', negPrompt.trim());

      const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?${params}`;
      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error(`Status ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImage(url);
      setImgHistory(prev => [url, ...prev].slice(0, 6));
    } catch {
      setErrorMsg('Image generation failed. Please check your connection and try again.');
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (src = image) => {
    if (!src) return;
    const a = document.createElement('a');
    a.href = src;
    a.download = 'imagine-ai-flux.jpg';
    a.click();
  };

  const openPreview = (src) => { setPreviewSrc(src); setPreview(true); };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generateImage(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-slate-950 text-white flex flex-col"
    >
      {/* ── STICKY NAV ── */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/60 px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Home
        </Link>

        <h1 className="text-base font-black gradient-text">Image Generator</h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStyleOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors text-sm font-medium ${
            activeStyle
              ? 'bg-purple-600/20 border border-purple-500/40 text-purple-300'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <FontAwesomeIcon icon={faPalette} />
          <span className="hidden sm:inline">{activeStyle ? activeStyle.label : 'Styles'}</span>
        </motion.button>
      </header>

      {/* ── MAIN ── */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-5">

        {/* ── PROMPT PANEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl"
        >
          {/* Active style badge */}
          <AnimatePresence>
            {activeStyle && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-3"
              >
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                    {activeStyle.emoji} {activeStyle.label}
                  </span>
                  <button
                    onClick={() => setStyle(null)}
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                    title="Remove style"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-xs" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prompt textarea */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your image… e.g. a majestic dragon flying over a futuristic city at dusk"
              className="w-full bg-slate-800 border border-slate-700 focus:border-blue-500 text-white placeholder-slate-500 rounded-2xl py-4 px-5 text-sm resize-none h-24 outline-none transition-colors"
            />
            <span className="absolute bottom-3 right-4 text-slate-700 text-xs select-none">
              {prompt.length}
            </span>
          </div>

          {/* Advanced toggle */}
          <button
            onClick={() => setAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs mt-3 transition-colors select-none"
          >
            <FontAwesomeIcon icon={faSliders} />
            Advanced options
            <FontAwesomeIcon icon={showAdvanced ? faChevronUp : faChevronDown} className="text-xs" />
          </button>

          {/* Advanced panel */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Negative Prompt
                      <span className="normal-case text-slate-600 font-normal ml-1">(things to avoid)</span>
                    </label>
                    <input
                      type="text"
                      value={negPrompt}
                      onChange={(e) => setNegPrompt(e.target.value)}
                      placeholder="blurry, low quality, distorted, extra limbs…"
                      className="w-full bg-slate-800 border border-slate-700 focus:border-purple-500 text-white placeholder-slate-600 rounded-xl py-2.5 px-4 text-xs outline-none transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Model: <span className="text-slate-400 font-medium">FLUX</span></span>
                    <span>Provider: <span className="text-slate-400 font-medium">Pollinations AI</span></span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Generate button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={generateImage}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 pulse-glow"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating with FLUX…
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faImage} />
                Generate Image
              </>
            )}
          </motion.button>

          <p className="text-slate-700 text-xs mt-2.5 text-center select-none">
            Enter to generate &nbsp;·&nbsp; Powered by FLUX via Pollinations AI
          </p>
        </motion.div>

        {/* ── LOADING SHIMMER ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="rounded-3xl overflow-hidden"
            >
              <div className="shimmer rounded-3xl" style={{ height: 420 }} />
              <motion.p
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center mt-4 text-slate-500 text-sm"
              >
                FLUX is crafting your image…
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── GENERATED IMAGE ── */}
        <AnimatePresence>
          {image && !loading && (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="relative group rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                <img src={image} alt="FLUX Generated" className="w-full object-contain" />

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-200">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleDownload(image)}
                    className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 border border-white/20 transition-colors"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    Download
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => openPreview(image)}
                    className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 border border-white/20 transition-colors"
                  >
                    <FontAwesomeIcon icon={faExpand} />
                    Fullscreen
                  </motion.button>
                </div>
              </div>

              {/* Quick action bar below image */}
              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-slate-600 text-xs">
                  {activeStyle ? `Style: ${activeStyle.label}` : 'No style applied'}
                </span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDownload(image)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faDownload} /> Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openPreview(image)}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faExpand} /> View
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── IMAGE HISTORY ── */}
        <AnimatePresence>
          {imgHistory.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                  Generation History
                  <span className="text-slate-600 font-normal text-xs">{imgHistory.length} images</span>
                </span>
                <button
                  onClick={() => setImgHistory([])}
                  className="flex items-center gap-1 text-slate-600 hover:text-red-400 text-xs transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                  Clear
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {imgHistory.map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative group cursor-pointer rounded-xl overflow-hidden border border-slate-700 aspect-square"
                    onClick={() => openPreview(src)}
                  >
                    <img src={src} alt={`Gen ${i + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <FontAwesomeIcon icon={faExpand} className="text-white text-sm" />
                    </div>
                    {i === 0 && (
                      <span className="absolute top-1 left-1 bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                        NEW
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── EMPTY STATE ── */}
        {!image && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center py-16 text-slate-700"
          >
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-5 float-animation border border-slate-800">
              <FontAwesomeIcon icon={faImage} className="text-3xl text-slate-600" />
            </div>
            <p className="text-base font-semibold text-slate-500">Your image will appear here</p>
            <p className="text-sm mt-1 opacity-60">Try a style preset for better results</p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setStyleOpen(true)}
              className="mt-5 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faPalette} />
              Browse style presets
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ── Error Modal ── */}
      <Modal isOpen={isErrorOpen} onRequestClose={() => setErrorOpen(false)} className="modal" overlayClassName="overlay">
        <motion.div initial={{ opacity: 0, scale: 0.88, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.22 }}>
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 text-lg" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Generation Failed</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{errorMsg}</p>
            </div>
          </div>
          <button onClick={() => setErrorOpen(false)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
            Try Again
          </button>
        </motion.div>
      </Modal>

      {/* ── Style Presets Modal ── */}
      <Modal isOpen={isStyleOpen} onRequestClose={() => setStyleOpen(false)} className="modal" overlayClassName="overlay">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FontAwesomeIcon icon={faPalette} className="text-purple-600" />
              Style Presets
            </h2>
            <button onClick={() => setStyleOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <p className="text-slate-500 text-xs mb-4">Appends a style descriptor to your prompt automatically.</p>
          <div className="grid grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-0.5">
            {STYLE_PRESETS.map((preset) => {
              const isActive = activeStyle?.label === preset.label;
              return (
                <motion.button
                  key={preset.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setStyle(isActive ? null : preset); setStyleOpen(false); }}
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-sm font-medium text-left ${
                    isActive
                      ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/30'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <span className="text-lg leading-none">{preset.emoji}</span>
                  <span>{preset.label}</span>
                  {isActive && <FontAwesomeIcon icon={faCheck} className="ml-auto text-xs text-purple-200" />}
                </motion.button>
              );
            })}
          </div>
          {activeStyle && (
            <button
              onClick={() => { setStyle(null); setStyleOpen(false); }}
              className="w-full mt-3 text-slate-500 hover:text-slate-700 text-xs py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Clear active style
            </button>
          )}
        </motion.div>
      </Modal>

      {/* ── Fullscreen Preview Modal ── */}
      <Modal isOpen={isPreviewOpen} onRequestClose={() => setPreview(false)} className="modal-fullscreen" overlayClassName="overlay">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28 }}
          className="relative w-full h-full flex items-center justify-center p-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setPreview(false)}
            className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} />
          </motion.button>

          {previewSrc && (
            <img
              src={previewSrc}
              alt="Fullscreen preview"
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleDownload(previewSrc)}
            className="absolute bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-colors shadow-lg text-sm"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download
          </motion.button>
        </motion.div>
      </Modal>
    </motion.div>
  );
};

export default ImageGen;
