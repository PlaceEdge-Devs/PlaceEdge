import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Camera, Download, UploadCloud, X, Crop } from 'lucide-react';

const ImageCropperDialog = lazy(() => import('./ImageCropperDialog'));

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    // Reset the input so that selecting the same file again triggers onChange
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
        aria-label={defaultText}
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
    reader.onload = (e) => {
      setCropImageSrc(e.target.result);
      setCropTarget({ type: 'student', index });
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCropImageSrc(e.target.result);
      setCropTarget('logo');
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedDataUrl) => {
    if (cropTarget === 'logo') {
      setFormData({ 
        ...formData, 
        companyLogo: croppedDataUrl, 
        originalCompanyLogo: cropImageSrc 
      });
    } else if (cropTarget?.type === 'student') {
      const newStudents = [...formData.students];
      newStudents[cropTarget.index].photoDataUrl = croppedDataUrl;
      newStudents[cropTarget.index].originalPhotoDataUrl = cropImageSrc;
      setFormData({ ...formData, students: newStudents });
    }
  };

  const handleEditLogo = () => {
    const original = formData.originalCompanyLogo || formData.companyLogo;
    if (original) {
      setCropImageSrc(original);
      setCropTarget('logo');
      setCropModalOpen(true);
    }
  };

  const handleEditStudentPhoto = (index) => {
    const student = formData.students[index];
    const original = student.originalPhotoDataUrl || student.photoDataUrl;
    if (original) {
      setCropImageSrc(original);
      setCropTarget({ type: 'student', index });
      setCropModalOpen(true);
    }
  };

  const handleRemoveLogo = () => {
    setFormData({ ...formData, companyLogo: null, originalCompanyLogo: null });
  };

  const handleRemoveStudentPhoto = (index) => {
    const newStudents = [...formData.students];
    newStudents[index].photoDataUrl = null;
    newStudents[index].originalPhotoDataUrl = null;
    setFormData({ ...formData, students: newStudents });
  };

  React.useEffect(() => {
    if (formData.students.length === 0) {
      setFormData({
        ...formData,
        students: [{ name: '', department: 'AI&DS', year: 'BE', batch: '', role: '', photoDataUrl: null }]
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

  const isStipend = formData.compensationType === 'Stipend';

  return (
    <Card className="border border-white/50 shadow-2xl bg-white/70 backdrop-blur-2xl rounded-[2rem] overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center pb-6 border-b border-zinc-200/60 px-6 pt-6">
        <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900">Flyer Data</CardTitle>
        <Select
          value={String(formData.students.length || 1)}
          onValueChange={handleLayoutChange}
        >
          <SelectTrigger className="w-[140px]" aria-label="Number of students">
            <SelectValue placeholder="Select students" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map(n => (
              <SelectItem key={n} value={String(n)}>
                {n} Student{n > 1 ? 's' : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="px-6 pt-8 pb-8">
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="institute-select">Institute</Label>
              <Select value={formData.headerType || 'ADYPSOE'} onValueChange={val => setFormData({ ...formData, headerType: val })}>
                <SelectTrigger id="institute-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADYPSOE">ADYPSOE</SelectItem>
                  <SelectItem value="ADYPU">ADYPU</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                type="text"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Google, Evonence"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <Label>Company Logo</Label>
              <FileUploadZone
                onUpload={handleLogoUpload}
                onRemove={handleRemoveLogo}
                onEdit={handleEditLogo}
                isUploaded={!!formData.companyLogo}
                defaultText="Upload Logo..."
                uploadedText="Logo Uploaded"
                bgClass="bg-zinc-50"
                hoverClass="hover:bg-zinc-100"
              />
              {formData.companyLogo && (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Logo Size</span>
                    <span className="font-semibold text-zinc-600">{formData.logoScale}px</span>
                  </div>
                  <Slider
                    min={60}
                    max={500}
                    step={1}
                    value={[formData.logoScale]}
                    onValueChange={val => setFormData({ ...formData, logoScale: Array.isArray(val) ? val[0] : val })}
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                {/* <Label>{isStipend ? 'Stipend' : 'Package'}</Label> */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Package</span>
                  <Switch
                    checked={isStipend}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, compensationType: checked ? 'Stipend' : 'Package' })
                    }
                    aria-label="Toggle between Package and Stipend compensation type"
                  />
                  <span className="text-xs text-zinc-500">Stipend</span>
                </div>
              </div>
              <Label htmlFor="compensation-amount" className="sr-only">{isStipend ? 'Stipend' : 'Package'} Amount</Label>
              <Input
                id="compensation-amount"
                type="text"
                value={formData.stipend}
                onChange={e => setFormData({ ...formData, stipend: e.target.value })}
                placeholder="Optional"
              />
            </div>
          </motion.div>

          {formData.students.map((student, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="bg-white/40 border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4 bg-zinc-50/50 border-b border-zinc-100/50">
                  <CardTitle className="text-base font-semibold text-zinc-700 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold shadow-sm">
                      {i + 1}
                    </div>
                    Student Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`student-name-${i}`}>Full Name</Label>
                    <Input
                      id={`student-name-${i}`}
                      type="text" 
                      value={student.name} 
                      onChange={e => handleStudentChange(i, 'name', e.target.value)} 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Photo</Label>
                    <FileUploadZone
                      onUpload={(file) => handlePhotoUpload(i, file)}
                      onRemove={() => handleRemoveStudentPhoto(i)}
                      onEdit={() => handleEditStudentPhoto(i)}
                      isUploaded={!!student.photoDataUrl}
                      defaultText="Upload Photo..."
                      uploadedText="Photo Uploaded"
                      bgClass="bg-white"
                      hoverClass="hover:bg-zinc-50"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`year-select-${i}`}>Year</Label>
                    <Select value={student.year || 'Final Year'} onValueChange={val => handleStudentChange(i, 'year', val)}>
                      <SelectTrigger id={`year-select-${i}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Second Year">Second Year</SelectItem>
                        <SelectItem value="Third Year">Third Year</SelectItem>
                        <SelectItem value="Final Year">Final Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`department-select-${i}`}>Department</Label>
                    <Select value={student.department} onValueChange={val => handleStudentChange(i, 'department', val)}>
                      <SelectTrigger id={`department-select-${i}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CS">Computer Engineering</SelectItem>
                        <SelectItem value="AI&DS">AI & Data Science</SelectItem>
                        <SelectItem value="MECH">Mechanical Engineering</SelectItem>
                        <SelectItem value="CIVIL">Civil Engineering</SelectItem>
                        <SelectItem value="ENTC">E&TC Engineering</SelectItem>
                        <SelectItem value="BCA AI&ML">BCA AI & ML</SelectItem>
                        <SelectItem value="BCA">BCA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`student-role-${i}`}>Role</Label>
                    <Input
                      id={`student-role-${i}`}
                      type="text" 
                      value={student.role} 
                      onChange={e => handleStudentChange(i, 'role', e.target.value)} 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`student-batch-${i}`}>Batch</Label>
                    <Input
                      id={`student-batch-${i}`}
                      type="text" 
                      value={student.batch} 
                      onChange={e => handleStudentChange(i, 'batch', e.target.value)} 
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div variants={itemVariants} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onExportImage}
              className="relative w-full py-7 text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] border-0 rounded-2xl overflow-hidden group"
              size="lg"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Download className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              Export PNG
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>

      <Suspense fallback={null}>
        <ImageCropperDialog
          open={cropModalOpen}
          onOpenChange={setCropModalOpen}
          imageSrc={cropImageSrc}
          aspect={cropTarget === 'logo' ? undefined : 280 / 320}
          onCropComplete={handleCropComplete}
        />
      </Suspense>
    </Card>
  );
}
