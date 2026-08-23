import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Camera, Download, UploadCloud, X, Crop } from 'lucide-react';
import { CornerOrnamentTR, CornerOrnamentBL } from './DecorativeBackground';

const ImageCropperDialog = lazy(() => import('./ImageCropperDialog'));

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      className="relative w-full h-full group"
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
      <div className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm transition-all duration-200 ${isDragging ? 'dragging' : ''} dropzone`}>
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
   Helpers
───────────────────────────────────────── */
function SectionTag({ children }) {
  return <span className="section-label">{children}</span>;
}

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
   SetuForm Main
───────────────────────────────────────── */
export default function SetuForm({ formData, setFormData, onExportImage }) {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);

  const handlePhotoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { setCropImageSrc(e.target.result); setCropModalOpen(true); };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedDataUrl) => {
    setFormData({ ...formData, speakerPhotoSrc: croppedDataUrl, originalSpeakerPhotoSrc: cropImageSrc });
  };

  const handleEditPhoto = () => {
    const original = formData.originalSpeakerPhotoSrc || formData.speakerPhotoSrc;
    if (original) { setCropImageSrc(original); setCropModalOpen(true); }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, speakerPhotoSrc: null, originalSpeakerPhotoSrc: null });
  };

  const handleBulletsChange = (e) => {
    setFormData({ ...formData, attendBullets: e.target.value.split('\n') });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22 } }
  };

  const inputStyle = {
    background: 'var(--bg-input)',
    borderColor: 'var(--border-input)',
    color: 'var(--text-primary)',
  };

  return (
    <MagicCard
      className="rounded-[2rem] overflow-hidden relative border-0 shadow-lg"
      gradientColor="rgba(99, 102, 241, 0.15)"
      gradientFrom="#6366F1"
      gradientTo="#4F46E5"
    >
      {/* Decorative corner ornaments */}
      <CornerOrnamentTR className="w-20 h-20 opacity-60" />
      <CornerOrnamentBL className="w-20 h-20 opacity-60" />
      {/* ── Header ── */}
      <div
        className="flex flex-row justify-between items-center px-6 py-5"
        style={{ borderBottom: '1px solid var(--border-muted)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.55 0.17 262)' }} />
          <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Setu Poster Data
          </h2>
        </div>
        <span className="section-label px-2.5 py-1 rounded-full"
          style={{ background: 'oklch(0.55 0.17 262 / 0.1)', color: 'oklch(0.6 0.17 262)' }}>
          Setu Event
        </span>
      </div>

      {/* ── Body ── */}
      <div className="px-6 pt-6 pb-8 max-h-[80vh] overflow-y-auto scrollbar-thin">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-7">

          {/* ── Event Info ── */}
          <motion.div variants={itemVariants}>
            <SectionTag>Event Info</SectionTag>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <Field label="Institute" htmlFor="setu-institute-select">
                <Select value={formData.headerType || 'ADYPSOE'} onValueChange={val => setFormData({ ...formData, headerType: val })}>
                  <SelectTrigger id="setu-institute-select" style={inputStyle}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADYPSOE">ADYPSOE</SelectItem>
                    <SelectItem value="ADYPU">ADYPU</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Event Tag" htmlFor="setu-event-tag">
                <Input
                  id="setu-event-tag"
                  type="text"
                  value={formData.eventTag}
                  onChange={e => setFormData({ ...formData, eventTag: e.target.value })}
                  placeholder="e.g. CAMPUS TO CORPORATE"
                  style={inputStyle}
                  className="focus-visible:ring-indigo-500/30"
                />
              </Field>

              <Field label="Seminar Title" htmlFor="setu-seminar-title" span2>
                <Input
                  id="setu-seminar-title"
                  type="text"
                  value={formData.seminarTitle}
                  onChange={e => setFormData({ ...formData, seminarTitle: e.target.value })}
                  placeholder="Seminar Title"
                  style={inputStyle}
                  className="focus-visible:ring-indigo-500/30"
                />
              </Field>

              <Field label="Date" htmlFor="setu-date">
                <Input
                  id="setu-date"
                  type="text"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Date: Saturday, 1st August 2026"
                  style={inputStyle}
                  className="focus-visible:ring-indigo-500/30"
                />
              </Field>

              <Field label="Time" htmlFor="setu-time">
                <Input
                  id="setu-time"
                  type="text"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  placeholder="Time: 11:30 AM"
                  style={inputStyle}
                  className="focus-visible:ring-indigo-500/30"
                />
              </Field>

              <Field label="Platform" htmlFor="setu-platform" span2>
                <Input
                  id="setu-platform"
                  type="text"
                  value={formData.platform}
                  onChange={e => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="Platform: Virtual (Online)"
                  style={inputStyle}
                  className="focus-visible:ring-indigo-500/30"
                />
              </Field>
            </div>
          </motion.div>

          {/* ── Speaker Details ── */}
          <motion.div variants={itemVariants}>
            <SectionTag>Speaker Details</SectionTag>
            <motion.div
              className="glass-card rounded-2xl overflow-hidden mt-3"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="flex items-center gap-3 px-5 py-3.5"
                style={{ borderBottom: '1px solid var(--border-muted)' }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'oklch(0.55 0.17 262 / 0.12)', border: '1px solid oklch(0.55 0.17 262 / 0.2)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.6 0.17 262)' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Speaker</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                <Field label="Speaker Photo">
                  <FileUploadZone
                    onUpload={handlePhotoUpload}
                    onRemove={handleRemovePhoto}
                    onEdit={handleEditPhoto}
                    isUploaded={!!formData.speakerPhotoSrc}
                    defaultText="Upload Photo..."
                    uploadedText="Photo Ready ✓"
                  />
                </Field>

                <Field label="Speaker Name" htmlFor="setu-speaker-name">
                  <Input
                    id="setu-speaker-name"
                    type="text"
                    value={formData.speakerName}
                    onChange={e => setFormData({ ...formData, speakerName: e.target.value })}
                    placeholder="Full name"
                    style={inputStyle}
                    className="focus-visible:ring-indigo-500/30"
                  />
                </Field>

                <Field label="Speaker Title" htmlFor="setu-speaker-title" span2>
                  <Input
                    id="setu-speaker-title"
                    type="text"
                    value={formData.speakerTitle}
                    onChange={e => setFormData({ ...formData, speakerTitle: e.target.value })}
                    placeholder="e.g. CEO at TechCorp, IIT Alumni"
                    style={inputStyle}
                    className="focus-visible:ring-indigo-500/30"
                  />
                </Field>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Attendees Section ── */}
          <motion.div variants={itemVariants}>
            <SectionTag>Audience</SectionTag>
            <motion.div
              className="glass-card rounded-2xl overflow-hidden mt-3"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="flex items-center gap-3 px-5 py-3.5"
                style={{ borderBottom: '1px solid var(--border-muted)' }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'oklch(0.62 0.18 155 / 0.12)', border: '1px solid oklch(0.62 0.18 155 / 0.2)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.62 0.18 155)' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Who Should Attend</span>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <Field label="Heading" htmlFor="setu-attend-heading">
                  <Input
                    id="setu-attend-heading"
                    type="text"
                    value={formData.attendHeading}
                    onChange={e => setFormData({ ...formData, attendHeading: e.target.value })}
                    style={inputStyle}
                    className="focus-visible:ring-indigo-500/30"
                  />
                </Field>
                <Field label="Bullets (one per line)">
                  <Textarea
                    value={(formData.attendBullets || []).join('\n')}
                    onChange={handleBulletsChange}
                    className="min-h-[100px] text-sm focus-visible:ring-indigo-500/30"
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="• Final Year Students&#10;• Students interested in corporate roles"
                  />
                </Field>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Export Button ── */}
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <ShimmerButton
              id="export-setu-btn"
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

      <Suspense fallback={null}>
        <ImageCropperDialog
          open={cropModalOpen}
          onOpenChange={setCropModalOpen}
          imageSrc={cropImageSrc}
          aspect={362 / 430}
          onCropComplete={handleCropComplete}
        />
      </Suspense>
    </MagicCard>
  );
}
