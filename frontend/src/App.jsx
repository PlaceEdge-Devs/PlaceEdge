import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlyerForm from './components/FlyerForm';
import Settings from './components/Settings';
import SetuForm from './components/SetuForm';
import {
  GradientOrbs,
  DotGrid,
  CanvasGrid,
  CanvasCornerTicks,
  FloatingShapesTopLeft,
  FloatingShapesBottomRight,
  FloatingShapesMidRight,
  AnimatedFloatingShapes,
  HeaderDecoration,
  CornerOrnamentTR,
  CornerOrnamentBL,
  RulerAccent,
  SunIcon,
  MoonIcon,
} from './components/DecorativeBackground';
import { AnimatedGridPattern } from "./components/magicui/AnimatedGridPattern";
import { useTheme } from './hooks/useTheme';

const FlyerPreview = lazy(() => import('./components/FlyerPreview'));
const SetuEventPoster = lazy(() => import('./components/Flyers/Setu'));

const initialSetuData = {
  headerType: 'ADYPSOE',
  eventTag: 'CAMPUS TO CORPORATE',
  seminarTitle: 'Seminar Title',
  date: 'Date: ',
  time: 'Time: ',
  platform: 'Platform: Virtual (Online)',
  speakerPhotoSrc: null,
  speakerName: '',
  speakerTitle: '',
  attendHeading: 'Who Should Attend:',
  attendBullets: []
};

/* ─────────────────────────────────────────
   Canvas skeleton
───────────────────────────────────────── */
function CanvasSkeleton() {
  return (
    <div
      className="rounded-[2rem] w-full h-[540px] flex items-center justify-center"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-muted)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-current animate-spin"
          style={{ borderTopColor: 'transparent', color: 'var(--accent-green)' }}
        />
        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          Loading Canvas…
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Theme toggle button
───────────────────────────────────────── */
function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.22 }}
          >
            <SunIcon className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -60, scale: 0.6 }}
            transition={{ duration: 0.22 }}
          >
            <MoonIcon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─────────────────────────────────────────
   Canvas panel — live preview right pane
───────────────────────────────────────── */
function CanvasPanel({ children }) {
  return (
    <div
      className="relative rounded-[2rem] overflow-hidden"
      style={{
        background: 'var(--bg-app)',
        border: '1px solid var(--border-muted)',
        boxShadow: 'var(--shadow-canvas)',
        minHeight: 540,
      }}
    >
      {/* Checker texture */}
      <CanvasGrid className="opacity-80" />

      {/* Frame corner ticks */}
      <CanvasCornerTicks />

      {/* "PREVIEW" label — top left corner */}
      <div
        className="absolute top-4 left-5 z-20 flex items-center gap-1.5"
      >
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent-green)' }} />
        <span className="section-label" style={{ color: 'var(--text-muted)' }}>LIVE PREVIEW</span>
      </div>

      {/* Ruler accent — top edge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 opacity-60">
        <RulerAccent className="w-48 text-zinc-400 dark:text-zinc-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 pt-10 flex justify-center items-start">
        {children}
      </div>

      {/* Corner ornaments */}
      <CornerOrnamentTR className="w-16 h-16 opacity-70" />
      <CornerOrnamentBL className="w-16 h-16 opacity-70" />
    </div>
  );
}

/* ─────────────────────────────────────────
   App
───────────────────────────────────────── */
function App() {
  const [activeTab, setActiveTab] = useState('placement');
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: null,
    logoScale: 200,
    stipend: '',
    compensationType: 'Package',
    headerType: 'ADYPSOE',
    students: []
  });
  const [setuFormData, setSetuFormData] = useState(initialSetuData);
  const [stageRef, setStageRef] = useState(null);

  const handleExportImage = () => {
    if (stageRef) {
      const dataURL = stageRef.toDataURL({ pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'placement-flyer.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const tabs = [
    { id: 'placement', label: 'Placement' },
    { id: 'setu', label: 'Setu' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden p-4 md:p-8 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-app)' }}
    >
      {/* ══════════ LAYER 0: Ambient orbs ══════════ */}
      <GradientOrbs />

      {/* ══════════ LAYER 1: Animated Grid ══════════ */}
      <AnimatedGridPattern
        numSquares={60}
        maxOpacity={0.25}
        duration={3}
        repeatDelay={1}
        className="opacity-45"
      />

      {/* ══════════ LAYER 2: Large corner geometry ══════════ */}
      <FloatingShapesTopLeft className="top-0 left-0 w-[480px] h-[480px] opacity-90" />
      <FloatingShapesBottomRight className="bottom-0 right-0 w-[500px] h-[500px] opacity-90" />

      {/* ══════════ LAYER 3: Right-edge mid decoration ══════════ */}
      <FloatingShapesMidRight className="top-1/4 right-0 w-[180px] h-[600px] opacity-80" />

      {/* ══════════ LAYER 4: Animated floating shapes ══════════ */}
      <AnimatedFloatingShapes />

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="w-full max-w-[1440px] relative z-10">

        {/* ────── HEADER ────── */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
        >
          {/* Header right-edge constellation decoration */}
          <HeaderDecoration className="top-0 right-0 w-[380px] h-[100px] opacity-80 hidden lg:block" />

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {/* Animated brand badge */}
              <div
                className="relative flex items-center justify-center w-9 h-9 rounded-xl"
                style={{
                  background: 'var(--accent-red-soft)',
                  border: '1px solid oklch(0.55 0.22 27 / 0.18)',
                }}
              >
                <div className="w-3.5 h-3.5 rounded-full" style={{ background: 'var(--accent-red)' }} />
                <div
                  className="absolute inset-0 rounded-xl animate-ping opacity-15"
                  style={{ background: 'var(--accent-red)' }}
                />
              </div>
              <h1
                className="text-3xl md:text-4xl tracking-tight font-extrabold bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, oklch(0.6 0.22 27), oklch(0.48 0.22 27))',
                  fontFamily: "'Emilys Candy', cursive",
                }}
              >
                Poster SPCR
              </h1>
            </div>
            <p
              className="mt-1.5 text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              ADYPSOE · SPCR Office Automation
            </p>
          </div>

          {/* Right: nav + theme toggle */}
          <div className="flex items-center gap-3">
            <nav className="nav-pill flex p-1.5 rounded-full gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200"
                  style={{ color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)' }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-tab-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'var(--bg-app)',
                        boxShadow: '0 2px 8px -2px rgba(0,0,0,0.12)',
                        border: '1px solid var(--border-muted)',
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </motion.header>

        {/* ────── MAIN ────── */}
        <main className="w-full relative">
          <AnimatePresence mode="wait">

            {/* ── Placement ── */}
            {activeTab === 'placement' && (
              <motion.div
                key="placement"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Sidebar */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <FlyerForm
                    formData={formData}
                    setFormData={setFormData}
                    onExportImage={handleExportImage}
                  />
                </div>

                {/* Canvas */}
                <div className="lg:col-span-7">
                  <div className="sticky top-8">
                    <CanvasPanel>
                      <Suspense fallback={<CanvasSkeleton />}>
                        <div
                          className="rounded-[2rem] overflow-hidden"
                          style={{ boxShadow: 'var(--shadow-canvas)' }}
                        >
                          <FlyerPreview formData={formData} onExportReady={setStageRef} />
                        </div>
                      </Suspense>
                    </CanvasPanel>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Setu ── */}
            {activeTab === 'setu' && (
              <motion.div
                key="setu"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <SetuForm
                    formData={setuFormData}
                    setFormData={setSetuFormData}
                    onExportImage={handleExportImage}
                  />
                </div>

                <div className="lg:col-span-7">
                  <div className="sticky top-8">
                    <CanvasPanel>
                      <div
                        className="rounded-[2rem] overflow-hidden"
                        style={{ boxShadow: 'var(--shadow-canvas)', display: 'flex', justifyContent: 'center' }}
                      >
                        <Suspense fallback={<CanvasSkeleton />}>
                          <SetuEventPoster onExportReady={setStageRef} content={setuFormData} />
                        </Suspense>
                      </div>
                    </CanvasPanel>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Settings ── */}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <Settings />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* ────── FOOTER ────── */}
        <footer className="mt-16 pb-4 flex items-center justify-center gap-2">
          <span className="text-[11px] tracking-wider" style={{ color: 'var(--text-muted)' }}>
            ADYPSOE · Students Progression &amp; Corporate Relations
          </span>
          <span className="text-[11px] opacity-40" style={{ color: 'var(--text-muted)' }}>
            · Poster SPCR
          </span>
        </footer>

      </div>
    </div>
  );
}

export default App;
