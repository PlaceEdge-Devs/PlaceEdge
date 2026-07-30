import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlyerForm from './components/FlyerForm';
import FlyerPreview from './components/FlyerPreview';
import ResultDashboard from './components/ResultDashboard';
import Settings from './components/Settings';
import { generateCaption } from './utils/api';

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: null,
    logoScale: 200,
    stipend: '',
    students: []
  });
  const [caption, setCaption] = useState('');
  const [stageRef, setStageRef] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCaption = async () => {
    setIsGenerating(true);
    try {
      const result = await generateCaption(formData);
      setCaption(result);
    } catch (error) {
      alert('Failed to generate caption');
    } finally {
      setIsGenerating(false);
    }
  };

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
    { id: 'generator', label: 'Generator' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-[1400px]">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl tracking-tight font-bold text-red-600" style={{ fontFamily: "'Emilys Candy', cursive" }}>Poster SPCR - ADYPSOE</h1>
            <p className="text-zinc-500 mt-1 font-bold">ADYPSOE SPCR Office Automation</p>
          </div>

          {/* Mac OS Dock / Pill Navigation */}
          <nav className="flex space-x-1 bg-zinc-200/50 p-1 rounded-full border border-zinc-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 text-sm font-medium rounded-full transition-colors ${activeTab === tab.id ? 'text-emerald-900' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-zinc-200/50"
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
            {activeTab === 'generator' ? (
              <motion.div
                key="generator"
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
                    onGenerateCaption={handleGenerateCaption}
                    isGenerating={isGenerating}
                  />
                  <ResultDashboard
                    caption={caption}
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
