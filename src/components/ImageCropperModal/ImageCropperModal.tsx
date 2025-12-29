import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  CropContainer,
  ControlsContainer,
  ZoomControl,
  ZoomLabel,
  ZoomSlider,
  ButtonContainer,
  Button,
  LoadingOverlay,
  LoadingText
} from './ImageCropperModal.styles';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedImageBlob: Blob) => Promise<void>;
  aspectRatio?: number;
  cropShape?: 'rect' | 'round';
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Set canvas size to match crop area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped portion of the image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg', 0.95);
  });
};

const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  aspectRatio = 1,
  cropShape = 'round'
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop);
  }, []);

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const onCropCompleteCallback = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleConfirm = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    setIsProcessing(true);
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      await onCropComplete(croppedImageBlob);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={(e) => {
      if (e.target === e.currentTarget) {
        handleCancel();
      }
    }}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Adjust Profile Picture</ModalTitle>
          <CloseButton onClick={handleCancel}>×</CloseButton>
        </ModalHeader>
        
        <CropContainer>
          {isProcessing && (
            <LoadingOverlay>
              <LoadingText>Processing...</LoadingText>
            </LoadingOverlay>
          )}
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            cropShape={cropShape}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteCallback}
            minZoom={1}
            maxZoom={3}
            restrictPosition={true}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                position: 'relative'
              }
            }}
          />
        </CropContainer>

        <ControlsContainer>
          <ZoomControl>
            <ZoomLabel>Zoom</ZoomLabel>
            <ZoomSlider
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </ZoomControl>

          <ButtonContainer>
            <Button variant="secondary" onClick={handleCancel} disabled={isProcessing}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleConfirm} disabled={isProcessing || !croppedAreaPixels}>
              Confirm
            </Button>
          </ButtonContainer>
        </ControlsContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ImageCropperModal;

