import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download } from 'lucide-react';

export default function ResultDashboard({ caption, onExportImage }) {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-[2.5rem] p-8 relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Generated Assets</h2>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={onExportImage}
            className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            <Download size={16} />
            Export PNG
          </motion.button>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">LinkedIn Caption</h3>
            {caption && (
              <button 
                onClick={() => navigator.clipboard.writeText(caption)}
                className="text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <Copy size={14} /> Copy
              </button>
            )}
          </div>
          
          <div className="relative">
            <textarea 
              readOnly 
              value={caption || 'Caption will appear here after generation...'} 
              rows={8} 
              className={`w-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl px-5 py-4 text-sm leading-relaxed focus:outline-none resize-none transition-colors ${!caption ? 'text-zinc-400 italic' : 'text-zinc-800'}`}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
