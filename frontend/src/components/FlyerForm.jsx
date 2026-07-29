import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';

export default function FlyerForm({ formData, setFormData, onGenerateCaption, isGenerating }) {
  const handleLayoutChange = (e) => {
    const layout = parseInt(e.target.value);
    const newStudents = [...formData.students];
    if (layout > newStudents.length) {
      for (let i = newStudents.length; i < layout; i++) {
        newStudents.push({ name: '', department: 'Computer Engineering', batch: '', role: '', linkedinProfileUrl: '', photoDataUrl: null });
      }
    } else {
      newStudents.splice(layout);
    }
    setFormData({ ...formData, students: newStudents });
  };

  const handleStudentChange = (index, field, value) => {
    const newStudents = [...formData.students];
    newStudents[index][field] = value;
    setFormData({ ...formData, students: newStudents });
  };

  const handlePhotoUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleStudentChange(index, 'photoDataUrl', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({ ...formData, companyLogo: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (formData.students.length === 0) {
      setFormData({
        ...formData,
        students: [{ name: '', department: 'Computer Engineering', batch: '', role: '', linkedinProfileUrl: '', photoDataUrl: null }]
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
  };

  return (
    <div className="bento-card flex flex-col gap-6 relative">
      <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900">Flyer Data</h2>
        <select
          value={formData.students.length || 1}
          onChange={handleLayoutChange}
          className="bg-zinc-50 border border-zinc-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
        >
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Student{n > 1 ? 's' : ''}</option>)}
        </select>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={e => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              placeholder="e.g. Google, Evonence"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Company Logo</label>
            <div className="relative w-full">
              <input type="file" accept="image/*" onChange={e => handleLogoUpload(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-zinc-100 text-zinc-500">
                <Camera size={16} />
                <span className="truncate">{formData.companyLogo ? 'Logo Uploaded' : 'Upload Logo...'}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Package / Stipend</label>
            <input
              type="text"
              value={formData.stipend}
              onChange={e => setFormData({ ...formData, stipend: e.target.value })}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              placeholder="Optional"
            />
          </div>
        </motion.div>

        {formData.students.map((student, i) => (
          <motion.div key={i} variants={itemVariants} className="flex flex-col gap-4 p-5 rounded-2xl bg-zinc-50/50 border border-zinc-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                {i + 1}
              </div>
              <h3 className="font-medium text-zinc-700">Student Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Full Name</label>
                <input type="text" value={student.name} onChange={e => handleStudentChange(i, 'name', e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Photo</label>
                <div className="relative w-full">
                  <input type="file" accept="image/*" onChange={e => handlePhotoUpload(i, e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm transition-colors hover:bg-zinc-50 text-zinc-500">
                    <Camera size={16} />
                    <span>{student.photoDataUrl ? 'Photo Uploaded' : 'Upload Photo...'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Department</label>
                <select value={student.department} onChange={e => handleStudentChange(i, 'department', e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors">
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="E&TC Engineering">E&TC Engineering</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Role</label>
                <input type="text" value={student.role} onChange={e => handleStudentChange(i, 'role', e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">LinkedIn URL</label>
                <input type="url" value={student.linkedinProfileUrl} onChange={e => handleStudentChange(i, 'linkedinProfileUrl', e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Batch</label>
                <input type="text" value={student.batch} onChange={e => handleStudentChange(i, 'batch', e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}

        <motion.button
          variants={itemVariants}
          onClick={onGenerateCaption}
          disabled={isGenerating}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3.5 font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>
              <Sparkles size={18} />
              Generate Caption
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
