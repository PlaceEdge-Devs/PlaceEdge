import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Download, UploadCloud, X, Crop } from 'lucide-react';

import ImageCropperDialog from './ImageCropperDialog';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FileUploadZone = ({ onUpload, onRemove, onEdit, isUploaded, defaultText, uploadedText, bgClass, hoverClass }) => {
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

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
    e.target.value = '';
  };

  return (
    <div
      className="relative w-full h-full group"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className={`flex items-center gap-2 border rounded-md px-4 py-2.5 text-sm transition-all duration-200 ${isDragging ? 'bg-emerald-50/80 border-emerald-400 text-emerald-600 shadow-sm' : `border-zinc-200 text-zinc-500 ${bgClass} ${hoverClass}`}`}>
        {isDragging ? <UploadCloud size={16} /> : <Camera size={16} />}
        <span className="truncate flex-1">{isDragging ? 'Drop image here' : (isUploaded ? uploadedText : defaultText)}</span>
        {isUploaded && (
          <div className="flex items-center gap-1 relative z-20 -mr-2">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit crop"
              >
                <Crop size={15} />
              </button>
            )}
            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove();
                }}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Remove image"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function SetuForm({ formData, setFormData, onExportImage }) {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);

  const handlePhotoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCropImageSrc(e.target.result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedDataUrl) => {
    setFormData({ 
      ...formData, 
      speakerPhotoSrc: croppedDataUrl, 
      originalSpeakerPhotoSrc: cropImageSrc 
    });
  };

  const handleEditPhoto = () => {
    const original = formData.originalSpeakerPhotoSrc || formData.speakerPhotoSrc;
    if (original) {
      setCropImageSrc(original);
      setCropModalOpen(true);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, speakerPhotoSrc: null, originalSpeakerPhotoSrc: null });
  };

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

  const handleBulletsChange = (e) => {
    setFormData({ ...formData, attendBullets: e.target.value.split('\n') });
  };

  return (
    <Card className="border border-white/50 shadow-2xl bg-white/70 backdrop-blur-2xl rounded-[2rem] overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center pb-6 border-b border-zinc-200/60 px-6 pt-6">
        <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900">Setu Poster Data</CardTitle>
      </CardHeader>
      
      <CardContent className="px-6 pt-8 pb-8">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label>Event Tag</Label>
              <Input
                type="text"
                value={formData.eventTag}
                onChange={e => setFormData({ ...formData, eventTag: e.target.value })}
                placeholder="e.g. CAMPUS TO CORPORATE"
              />
            </div>
            
            <div className="flex flex-col gap-2 md:col-span-2">
              <Label>Seminar Title</Label>
              <Input
                type="text"
                value={formData.seminarTitle}
                onChange={e => setFormData({ ...formData, seminarTitle: e.target.value })}
                placeholder="Seminar Title"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Date</Label>
              <Input
                type="text"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g. Date: Saturday, 1st August 2026"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Time</Label>
              <Input
                type="text"
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g. Time: 11:30 AM"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Platform</Label>
              <Input
                type="text"
                value={formData.platform}
                onChange={e => setFormData({ ...formData, platform: e.target.value })}
                placeholder="e.g. Platform: Virtual (Online)"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/40 border border-white/60 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-4 bg-zinc-50/50 border-b border-zinc-100/50">
                <CardTitle className="text-base font-semibold text-zinc-700">Speaker Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
                <div className="flex flex-col gap-2">
                  <Label>Speaker Photo</Label>
                  <FileUploadZone
                    onUpload={handlePhotoUpload}
                    onRemove={handleRemovePhoto}
                    onEdit={handleEditPhoto}
                    isUploaded={!!formData.speakerPhotoSrc}
                    defaultText="Upload Photo..."
                    uploadedText="Photo Uploaded"
                    bgClass="bg-white"
                    hoverClass="hover:bg-zinc-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Speaker Name</Label>
                  <Input 
                    type="text" 
                    value={formData.speakerName} 
                    onChange={e => setFormData({ ...formData, speakerName: e.target.value })} 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Speaker Title</Label>
                  <Input 
                    type="text" 
                    value={formData.speakerTitle} 
                    onChange={e => setFormData({ ...formData, speakerTitle: e.target.value })} 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/40 border border-white/60 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="pb-4 bg-zinc-50/50 border-b border-zinc-100/50">
                <CardTitle className="text-base font-semibold text-zinc-700">Who Should Attend</CardTitle>
              </CardHeader>
              <CardContent className="pt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Heading</Label>
                  <Input 
                    type="text" 
                    value={formData.attendHeading} 
                    onChange={e => setFormData({ ...formData, attendHeading: e.target.value })} 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Bullets (One per line)</Label>
                  <Textarea 
                    value={(formData.attendBullets || []).join('\n')}
                    onChange={handleBulletsChange}
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onExportImage}
              className="relative w-full py-7 text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] border-0 rounded-2xl overflow-hidden group"
              size="lg"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Download className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              Export PNG
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>

      <ImageCropperDialog
        open={cropModalOpen}
        onOpenChange={setCropModalOpen}
        imageSrc={cropImageSrc}
        aspect={362 / 430}
        onCropComplete={handleCropComplete}
      />
    </Card>
  );
}
