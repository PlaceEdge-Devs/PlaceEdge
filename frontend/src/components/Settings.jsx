import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { getSettings, saveSettings } from '../utils/api';

export default function Settings() {
  const [hodList, setHodList] = useState({});
  const [spcrTeam, setSpcrTeam] = useState([]);

  useEffect(() => {
    getSettings('hod').then(setHodList).catch(console.error);
    getSettings('spcr').then(setSpcrTeam).catch(console.error);
  }, []);

  const handleSaveHod = async () => {
    try {
      await saveSettings('hod', hodList);
    } catch (e) {
      alert('Failed to save HOD List');
    }
  };

  const handleSaveSpcr = async () => {
    try {
      await saveSettings('spcr', spcrTeam);
    } catch (e) {
      alert('Failed to save SPCR Team');
    }
  };

  const handleHodChange = (dept, field, value) => {
    setHodList(prev => ({
      ...prev,
      [dept]: { ...prev[dept], [field]: value }
    }));
  };

  const addHod = () => {
    const newDept = prompt("Enter department name:");
    if (newDept && !hodList[newDept]) {
      setHodList(prev => ({ ...prev, [newDept]: { name: '' } }));
    }
  };

  const removeHod = (dept) => {
    const newList = { ...hodList };
    delete newList[dept];
    setHodList(newList);
  };

  const handleSpcrChange = (index, field, value) => {
    const newList = [...spcrTeam];
    newList[index][field] = value;
    setSpcrTeam(newList);
  };

  const addSpcr = () => {
    setSpcrTeam([...spcrTeam, { name: '' }]);
  };

  const removeSpcr = (index) => {
    const newList = [...spcrTeam];
    newList.splice(index, 1);
    setSpcrTeam(newList);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* HOD Settings */}
      <div className="flex-1 bento-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Head of Departments</h2>
          <button onClick={addHod} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
            <Plus size={16} /> Add Dept
          </button>
        </div>
        
        <div className="flex flex-col divide-y divide-zinc-100">
          <AnimatePresence>
            {Object.entries(hodList).map(([dept, data]) => (
              <motion.div 
                key={dept} 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="py-4 relative group"
              >
                <div className="flex items-center justify-between mb-3">
                  <strong className="text-zinc-700 text-sm">{dept}</strong>
                  <button onClick={() => removeHod(dept)} className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Name" value={data.name} onChange={e => handleHodChange(dept, 'name', e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleSaveHod} className="mt-6 w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl py-3 font-medium transition-colors">
          Save HOD List
        </motion.button>
      </div>

      {/* SPCR Team Settings */}
      <div className="flex-1 bento-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900">SPCR Core Team</h2>
          <button onClick={addSpcr} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1">
            <Plus size={16} /> Add Member
          </button>
        </div>
        
        <div className="flex flex-col divide-y divide-zinc-100">
          <AnimatePresence>
            {spcrTeam.map((member, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="py-4 relative group"
              >
                <div className="flex items-center justify-between mb-3">
                  <strong className="text-zinc-700 text-sm">Member {i + 1}</strong>
                  <button onClick={() => removeSpcr(i)} className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Name" value={member.name} onChange={e => handleSpcrChange(i, 'name', e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleSaveSpcr} className="mt-6 w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl py-3 font-medium transition-colors">
          Save SPCR Team
        </motion.button>
      </div>
    </div>
  );
}
