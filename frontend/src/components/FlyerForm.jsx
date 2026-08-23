import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Camera, Download, UploadCloud, X, Crop } from 'lucide-react';
import { CornerOrnamentTR, CornerOrnamentBL, RulerAccent } from './DecorativeBackground';

const ImageCropperDialog = lazy(() => import('./ImageCropperDialog'));

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagicCard } from "./magicui/MagicCard";
import { ShimmerButton } from "./magicui/ShimmerButton";

/* ─────────────────────────────────────────
   Premium File Upload Dropzone
───────────────────────────────────────── */
const FileUploadZone = ({ onUpload, onRemove, onEdit, isUploaded, defaultText, uploadedText }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) onUpload(e.dataTransfer.files[0]);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files?.[0]) onUpload(e.target.files[0]);
    e.target.value = '';
  };

  return (
    <motion.div
      className={`relative w-full h-full group`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        aria-label={defaultText}
      />
      <div
        className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 ${
          isDragging ? 'dragging' : ''
        } dropzone`}
      >
        <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          {isDragging ? (
            <UploadCloud size={15} className="text-emerald-500" />
          ) : isUploaded ? (
            <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          ) : (
            <Camera size={15} />
          )}
        </span>

        <span className="truncate flex-1 font-medium">
          {isDragging ? 'Drop to upload' : isUploaded ? uploadedText : defaultText}
        </span>

        {isUploaded && (
          <div className="flex items-center gap-1 relative z-20 -mr-1">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
                className="p-1.5 rounded-lg transition-all duration-150 hover:scale-110"
                style={{ color: 'oklch(0.6 0.2 262)', background: 'oklch(0.55 0.17 262 / 0.1)' }}
                title="Edit crop"
              >
                <Crop size={13} />
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRemove(); }}
                className="p-1.5 rounded-lg transition-all duration-150 hover:scale-110"
                style={{ color: 'oklch(0.65 0.22 27)', background: 'oklch(0.55 0.22 27 / 0.1)' }}
                title="Remove image"
              >
                <X size={13} />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Section Header
───────────────────────────────────────── */
function SectionTag({ children }) {
  return (
    <span className="section-label">{children}</span>
  );
}

/* ─────────────────────────────────────────
   Field wrapper
───────────────────────────────────────── */
function Field({ label, htmlFor, children, span2 = false }) {
  return (
    <div className={`flex flex-col gap-1.5 ${span2 ? 'md:col-span-2' : ''}`}>
      {label && (
        <Label htmlFor={htmlFor} className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </Label>
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   FlyerForm Main
───────────────────────────────────────── */
export default function FlyerForm({ formData, setFormData, onExportImage }) {
  const handleLayoutChange = (val) => {
    const layout = parseInt(val);
    const newStudents = [...formData.students];
    if (layout > newStudents.length) {
      for (let i = newStudents.length; i < layout; i++) {
        newStudents.push({ name: '', department: 'AI&DS', year: 'BE', batch: '', role: '', photoDataUrl: null });
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

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [cropTarget, setCropTarget] = useState(null);

  const handlePhotoUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { setCropImageSrc(e.target.result); setCropTarget({ type: 'student', index }); setCropModalOpen(true); };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { setCropImageSrc(e.target.result); setCropTarget('logo'); setCropModalOpen(true); };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedDataUrl) => {
    if (cropTarget === 'logo') {
      setFormData({ ...formData, companyLogo: croppedDataUrl, originalCompanyLogo: cropImageSrc });
    } else if (cropTarget?.type === 'student') {
      const newStudents = [...formData.students];
      newStudents[cropTarget.index].photoDataUrl = croppedDataUrl;
      newStudents[cropTarget.index].originalPhotoDataUrl = cropImageSrc;
      setFormData({ ...formData, students: newStudents });
    }
  };

  const handleEditLogo = () => {
    const original = formData.originalCompanyLogo || formData.companyLogo;
    if (original) { setCropImageSrc(original); setCropTarget('logo'); setCropModalOpen(true); }
  };

  const handleEditStudentPhoto = (index) => {
    const student = formData.students[index];
    const original = student.originalPhotoDataUrl || student.photoDataUrl;
    if (original) { setCropImageSrc(original); setCropTarget({ type: 'student', index }); setCropModalOpen(true); }
  };

  const handleRemoveLogo = () => setFormData({ ...formData, companyLogo: null, originalCompanyLogo: null });

  const handleRemoveStudentPhoto = (index) => {
    const newStudents = [...formData.students];
    newStudents[index].photoDataUrl = null;
    newStudents[index].originalPhotoDataUrl = null;
    setFormData({ ...formData, students: newStudents });
  };

  React.useEffect(() => {
    if (formData.students.length === 0) {
      setFormData({ ...formData, students: [{ name: '', department: 'AI&DS', year: 'BE', batch: '', role: '', photoDataUrl: null }] });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22 } }
  };

  const isStipend = formData.compensationType === 'Stipend';

  return (
    <MagicCard
      className="rounded-[2rem] overflow-hidden relative border-0 shadow-lg"
      gradientColor="rgba(16, 185, 129, 0.15)"
      gradientFrom="#10B981"
      gradientTo="#059669"
    >
      {/* Decorative corner ornaments */}
      <CornerOrnamentTR className="w-20 h-20 opacity-60" />
      <CornerOrnamentBL className="w-20 h-20 opacity-60" />
      {/* ── Card Header ── */}
      <div
        className="flex flex-row justify-between items-center px-6 py-5"
        style={{ borderBottom: '1px solid var(--border-muted)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-red)' }} />
          <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Flyer Data
          </h2>
        </div>

        {/* Student count selector */}
        <div className="flex items-center gap-2">
          <SectionTag>Students</SectionTag>
          <Select
            value={String(formData.students.length || 1)}
            onValueChange={handleLayoutChange}
          >
            <SelectTrigger
              className="w-[110px] h-8 text-xs rounded-lg"
              style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)' }}
              aria-label="Number of students"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(n => (
                <SelectItem key={n} value={String(n)}>
                  {n} Student{n > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="px-6 pt-6 pb-8 max-h-[80vh] overflow-y-auto scrollbar-thin">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-7">

          {/* ── Company / Config Row ── */}
          <motion.div variants={itemVariants}>
            <SectionTag>Company</SectionTag>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <Field label="Institute" htmlFor="institute-select">
                <Select value={formData.headerType || 'ADYPSOE'} onValueChange={val => setFormData({ ...formData, headerType: val })}>
                  <SelectTrigger
                    id="institute-select"
                    style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADYPSOE">ADYPSOE</SelectItem>
                    <SelectItem value="ADYPU">ADYPU</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Company Name" htmlFor="company-name">
                <Input
                  id="company-name"
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Google, Evonence"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}
                  className="focus-visible:ring-emerald-500/30"
                />
              </Field>

              <Field label="Company Logo">
                <FileUploadZone
                  onUpload={handleLogoUpload}
                  onRemove={handleRemoveLogo}
                  onEdit={handleEditLogo}
                  isUploaded={!!formData.companyLogo}
                  defaultText="Upload Logo..."
                  uploadedText="Logo Ready ✓"
                />
                {formData.companyLogo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex flex-col gap-1.5 mt-2"
                  >
                    <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      <span>Logo Size</span>
                      <span className="font-bold" style={{ color: 'var(--text-secondary)' }}>{formData.logoScale}px</span>
                    </div>
                    <Slider
                      min={60} max={500} step={1}
                      value={[formData.logoScale]}
                      onValueChange={val => setFormData({ ...formData, logoScale: Array.isArray(val) ? val[0] : val })}
                    />
                    <div className="flex justify-between text-[10px]" style={{ color: 'var(--text-muted)' }}>
                      <span>Small</span><span>Large</span>
                    </div>
                  </motion.div>
                )}
              </Field>

              {/* Package / Stipend toggle field */}
              <Field>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold" style={{ color: isStipend ? 'var(--text-muted)' : 'var(--text-secondary)' }}>Package</span>
                  <Switch
                    checked={isStipend}
                    onCheckedChange={(checked) => setFormData({ ...formData, compensationType: checked ? 'Stipend' : 'Package' })}
                    aria-label="Toggle between Package and Stipend"
                  />
                  <span className="text-xs font-semibold" style={{ color: isStipend ? 'var(--text-secondary)' : 'var(--text-muted)' }}>Stipend</span>
                </div>
                <Label htmlFor="compensation-amount" className="sr-only">{isStipend ? 'Stipend' : 'Package'} Amount</Label>
                <Input
                  id="compensation-amount"
                  type="text"
                  value={formData.stipend}
                  onChange={e => setFormData({ ...formData, stipend: e.target.value })}
                  placeholder="Optional"
                  style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}
                  className="focus-visible:ring-emerald-500/30"
                />
              </Field>
            </div>
          </motion.div>

          {/* ── Student Cards ── */}
          {formData.students.map((student, i) => (
            <motion.div key={i} variants={itemVariants}>
              <SectionTag>Student {i + 1}</SectionTag>
              <motion.div
                className="glass-card rounded-2xl overflow-hidden mt-3"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Card heading strip */}
                <div
                  className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: '1px solid var(--border-muted)' }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold student-badge">
                    {i + 1}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Student Details
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                  <Field label="Full Name" htmlFor={`student-name-${i}`}>
                    <Input
                      id={`student-name-${i}`}
                      type="text"
                      value={student.name}
                      onChange={e => handleStudentChange(i, 'name', e.target.value)}
                      placeholder="Student's full name"
                      style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}
                      className="focus-visible:ring-emerald-500/30"
                    />
                  </Field>

                  <Field label="Photo">
                    <FileUploadZone
                      onUpload={(file) => handlePhotoUpload(i, file)}
                      onRemove={() => handleRemoveStudentPhoto(i)}
                      onEdit={() => handleEditStudentPhoto(i)}
                      isUploaded={!!student.photoDataUrl}
                      defaultText="Upload Photo..."
                      uploadedText="Photo Ready ✓"
                    />
                  </Field>

                  <Field label="Year" htmlFor={`year-select-${i}`}>
                    <Select value={student.year || 'Final Year'} onValueChange={val => handleStudentChange(i, 'year', val)}>
                      <SelectTrigger id={`year-select-${i}`} style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Second Year">Second Year</SelectItem>
                        <SelectItem value="Third Year">Third Year</SelectItem>
                        <SelectItem value="Final Year">Final Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Department" htmlFor={`department-select-${i}`}>
                    <Select value={student.department} onValueChange={val => handleStudentChange(i, 'department', val)}>
                      <SelectTrigger id={`department-select-${i}`} style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CS">Computer Engineering</SelectItem>
                        <SelectItem value="AI&DS">AI &amp; Data Science</SelectItem>
                        <SelectItem value="MECH">Mechanical Engineering</SelectItem>
                        <SelectItem value="CIVIL">Civil Engineering</SelectItem>
                        <SelectItem value="ENTC">E&amp;TC Engineering</SelectItem>
                        <SelectItem value="BCA AI&ML">BCA AI &amp; ML</SelectItem>
                        <SelectItem value="BCA">BCA</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Role" htmlFor={`student-role-${i}`}>
                    <Input
                      id={`student-role-${i}`}
                      type="text"
                      value={student.role}
                      onChange={e => handleStudentChange(i, 'role', e.target.value)}
                      placeholder="e.g. Software Engineer"
                      style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}
                      className="focus-visible:ring-emerald-500/30"
                    />
                  </Field>

                  <Field label="Batch" htmlFor={`student-batch-${i}`}>
                    <Input
                      id={`student-batch-${i}`}
                      type="text"
                      value={student.batch}
                      onChange={e => handleStudentChange(i, 'batch', e.target.value)}
                      placeholder="e.g. 2024–2025"
                      style={{ background: 'var(--bg-input)', borderColor: 'var(--border-input)', color: 'var(--text-primary)' }}
                      className="focus-visible:ring-emerald-500/30"
                    />
                  </Field>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* ── Export Button ── */}
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <ShimmerButton
              id="export-placement-btn"
              onClick={onExportImage}
              className="w-full py-4 text-base font-bold shadow-[0_4px_20px_oklch(0.62_0.18_155/0.35)]"
              background="linear-gradient(135deg, oklch(0.68 0.17 155), oklch(0.58 0.19 155))"
            >
              <div className="relative flex items-center justify-center gap-2.5">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Export PNG
              </div>
            </ShimmerButton>
          </motion.div>

        </motion.div>
      </div>

      {/* Crop dialog */}
      <Suspense fallback={null}>
        <ImageCropperDialog
          open={cropModalOpen}
          onOpenChange={setCropModalOpen}
          imageSrc={cropImageSrc}
          aspect={cropTarget === 'logo' ? undefined : 280 / 320}
          onCropComplete={handleCropComplete}
        />
      </Suspense>
    </MagicCard>
  );
}
