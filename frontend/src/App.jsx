import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlyerForm from './components/FlyerForm';
import FlyerPreview from './components/FlyerPreview';
import Settings from './components/Settings';
import SetuEventPoster, { DEFAULT_CONTENT as initialSetuData } from './components/Flyers/Setu';
import SetuForm from './components/SetuForm';

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
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden p-4 md:p-8 flex flex-col items-center">
      {/* Decorative Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1400px] relative z-10">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400 drop-shadow-sm" style={{ fontFamily: "'Emilys Candy', cursive" }}>
              Poster SPCR - ADYPSOE
            </h1>
            <p className="text-zinc-500 mt-2 font-medium tracking-wide text-sm">ADYPSOE SPCR Office Automation</p>
          </div>

          {/* Mac OS Dock / Pill Navigation */}
          <nav className="flex space-x-2 bg-white/60 backdrop-blur-xl p-1.5 rounded-full border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-7 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${activeTab === tab.id ? 'text-emerald-900' : 'text-zinc-500 hover:text-zinc-800 hover:bg-white/40'
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-zinc-100"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="w-full relative">
          <AnimatePresence mode="wait">
            {activeTab === 'placement' ? (
              <motion.div
                key="placement"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left Column: Form & Results */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <FlyerForm
                    formData={formData}
                    setFormData={setFormData}
                    onExportImage={handleExportImage}
                  />
                </div>

                {/* Right Column: Preview */}
                <div className="lg:col-span-7">
                  <div className="sticky top-8">
                    <FlyerPreview
                      formData={formData}
                      onExportReady={setStageRef}
                    />
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'setu' ? (
              <motion.div
                key="setu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left Column: Form & Results */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <SetuForm
                    formData={setuFormData}
                    setFormData={setSetuFormData}
                    onExportImage={handleExportImage}
                  />
                </div>

                {/* Right Column: Preview */}
                <div className="lg:col-span-7">
                  <div className="sticky top-8">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-zinc-200/60 bg-white" style={{ display: 'flex', justifyContent: 'center' }}>
                      <SetuEventPoster 
                        onExportReady={setStageRef}
                        content={setuFormData}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Settings />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
