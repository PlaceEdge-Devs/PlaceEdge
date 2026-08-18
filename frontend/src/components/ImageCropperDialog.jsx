import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import getCroppedImg from '@/lib/cropImage';

export default function ImageCropperDialog({
  open,
  onOpenChange,
  imageSrc,
  aspect,
  onCropComplete
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteInternal = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      onCropComplete(croppedImage);
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  // Reset state when a new image is loaded
  React.useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
    }
  }, [open, imageSrc]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[400px] bg-zinc-900 rounded-md overflow-hidden">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              restrictPosition={false}
              minZoom={0.1}
              onCropChange={setCrop}
              onCropComplete={onCropCompleteInternal}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          )}
        </div>

        <div className="flex flex-col gap-5 mt-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <Label>Zoom</Label>
              <span>{Math.round(zoom * 100)}%</span>
            </div>
            <Slider
              min={0.1}
              max={3}
              step={0.01}
              value={[zoom]}
              onValueChange={(val) => setZoom(Array.isArray(val) ? val[0] : val)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <Label>Rotation</Label>
              <span>{rotation}°</span>
            </div>
            <Slider
              min={0}
              max={360}
              step={0.1}
              value={[rotation]}
              onValueChange={(val) => setRotation(Array.isArray(val) ? val[0] : val)}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isProcessing}>
            {isProcessing ? 'Saving...' : 'Save Crop'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
