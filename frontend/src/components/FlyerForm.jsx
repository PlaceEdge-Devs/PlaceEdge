import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Download, UploadCloud } from 'lucide-react';

const FileUploadZone = ({ onUpload, isUploaded, defaultText, uploadedText, bgClass, hoverClass }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      className="relative w-full h-full"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={e => onUpload(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm transition-all duration-200 ${isDragging ? 'bg-emerald-50/80 border-emerald-400 text-emerald-600 shadow-sm' : `border-zinc-200 text-zinc-500 ${bgClass} ${hoverClass}`}`}>
        {isDragging ? <UploadCloud size={16} /> : <Camera size={16} />}
        <span className="truncate">{isDragging ? 'Drop image here' : (isUploaded ? uploadedText : defaultText)}</span>
      </div>
    </div>
  );
};

export default function FlyerForm({ formData, setFormData, onExportImage }) {
  const handleLayoutChange = (e) => {
    const layout = parseInt(e.target.value);
    const newStudents = [...formData.students];
    if (layout > newStudents.length) {
      for (let i = newStudents.length; i < layout; i++) {
        newStudents.push({ name: '', department: 'Computer Engineering', year: 'Final Year', batch: '', role: '', linkedinProfileUrl: '', photoDataUrl: null });
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
        students: [{ name: '', department: 'Computer Engineering', year: 'Final Year', batch: '', role: '', linkedinProfileUrl: '', photoDataUrl: null }]
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
            <FileUploadZone
              onUpload={handleLogoUpload}
              isUploaded={!!formData.companyLogo}
              defaultText="Upload Logo..."
              uploadedText="Logo Uploaded"
              bgClass="bg-zinc-50"
              hoverClass="hover:bg-zinc-100"
            />
            {formData.companyLogo && (
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>Logo Size</span>
                  <span className="font-semibold text-zinc-600">{formData.logoScale}px</span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={500}
                  step={5}
                  value={formData.logoScale}
                  onChange={e => setFormData({ ...formData, logoScale: Number(e.target.value) })}
                  className="w-full h-1.5 bg-zinc-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Small</span>
                  <span>Large</span>
                </div>
              </div>
            )}
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
                <FileUploadZone
                  onUpload={(file) => handlePhotoUpload(i, file)}
                  isUploaded={!!student.photoDataUrl}
                  defaultText="Upload Photo..."
                  uploadedText="Photo Uploaded"
                  bgClass="bg-white"
                  hoverClass="hover:bg-zinc-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Year</label>
                <select value={student.year || 'Final Year'} onChange={e => handleStudentChange(i, 'year', e.target.value)} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors">
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
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
          onClick={onExportImage}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3.5 font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Export PNG
        </motion.button>
      </motion.div>
    </div>
  );
}
