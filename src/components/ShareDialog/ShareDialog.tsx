import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../../i18n/hooks';
import { showSuccess, showError } from '../../utils/toast';
import {
  Overlay,
  DialogContainer,
  DialogHeader,
  DialogTitle,
  CloseButton,
  LinkSection,
  LinkContainer,
  LinkIcon,
  LinkContent,
  LinkTitle,
  LinkUrl,
  LinkActions,
  QRCodeButton,
  CopyButton,
  ShareToSection,
  ShareToTitle,
  ShareToGrid,
  ShareToItem,
  ShareToIcon,
  ShareToName,
  ShareUsingSection,
  ShareUsingTitle,
  ShareUsingGrid,
  ShareAppItem,
  ShareAppIcon,
  ShareAppName,
  QRCodeModal,
  QRCodeContent,
  QRCodeCloseButton,
} from './ShareDialog.styles';

export interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  isOpen,
  onClose,
  title,
  url,
  description,
}) => {
  const { t } = useI18n();
  const [showQRCode, setShowQRCode] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showSuccess(t('common.linkCopied') || 'Link copied to clipboard!');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showSuccess(t('common.linkCopied') || 'Link copied to clipboard!');
      } catch (err) {
        showError(t('common.failedToCopy') || 'Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShare = async (method: string) => {
    const shareData = {
      title: title,
      text: description || title,
      url: url,
    };

    switch (method) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'native':
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            showSuccess(t('common.shareSuccess') || 'Shared successfully!');
          } catch (error: any) {
            if (error.name !== 'AbortError') {
              showError(t('common.shareFailed') || 'Failed to share');
            }
          }
        } else {
          handleCopyLink();
        }
        break;
      default:
        break;
    }
  };

  const generateQRCode = () => {
    // Using a QR code API service
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  if (!isOpen) return null;

  return (
    <>
      <Overlay>
        <DialogContainer ref={dialogRef}>
          <DialogHeader>
            <DialogTitle>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              {t('common.shareLink') || 'Share link'}
            </DialogTitle>
            <CloseButton onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </CloseButton>
          </DialogHeader>

          <LinkSection>
            <LinkContainer>
              <LinkIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </LinkIcon>
              <LinkContent>
                <LinkTitle>{title}</LinkTitle>
                <LinkUrl>{url}</LinkUrl>
              </LinkContent>
              <LinkActions>
                <QRCodeButton onClick={() => setShowQRCode(true)} title="Show QR Code">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="5" height="5"></rect>
                    <rect x="16" y="3" width="5" height="5"></rect>
                    <rect x="3" y="16" width="5" height="5"></rect>
                    <line x1="9" y1="7" x2="9" y2="7.01"></line>
                    <line x1="9" y1="17" x2="9" y2="17.01"></line>
                    <line x1="7" y1="9" x2="7.01" y2="9"></line>
                    <line x1="17" y1="9" x2="17.01" y2="9"></line>
                    <line x1="12" y1="12" x2="12" y2="12.01"></line>
                    <line x1="12" y1="12" x2="16" y2="12"></line>
                    <line x1="12" y1="12" x2="12" y2="16"></line>
                    <line x1="16" y1="12" x2="16" y2="16"></line>
                    <line x1="12" y1="16" x2="16" y2="16"></line>
                  </svg>
                </QRCodeButton>
                <CopyButton onClick={handleCopyLink} title="Copy link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </CopyButton>
              </LinkActions>
            </LinkContainer>
          </LinkSection>

          <ShareToSection>
            <ShareToTitle>{t('common.shareTo') || 'Share to'}</ShareToTitle>
            <ShareToGrid>
              {/* Nearby Sharing */}
              <ShareToItem onClick={() => handleShare('native')}>
                <ShareToIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </ShareToIcon>
                <ShareToName>{t('common.nearbySharing') || 'Nearby Sharing'}</ShareToName>
              </ShareToItem>
            </ShareToGrid>
          </ShareToSection>

          <ShareUsingSection>
            <ShareUsingTitle>{t('common.shareUsing') || 'Share using'}</ShareUsingTitle>
            <ShareUsingGrid>
              <ShareAppItem onClick={() => handleShare('whatsapp')}>
                <ShareAppIcon style={{ background: '#25D366' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </ShareAppIcon>
                <ShareAppName>WhatsApp</ShareAppName>
              </ShareAppItem>

              <ShareAppItem onClick={() => handleShare('facebook')}>
                <ShareAppIcon style={{ background: '#1877F2' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </ShareAppIcon>
                <ShareAppName>Facebook</ShareAppName>
              </ShareAppItem>

              <ShareAppItem onClick={() => handleShare('twitter')}>
                <ShareAppIcon style={{ background: '#000000' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </ShareAppIcon>
                <ShareAppName>Twitter</ShareAppName>
              </ShareAppItem>

              <ShareAppItem onClick={() => handleShare('email')}>
                <ShareAppIcon style={{ background: '#EA4335' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                </ShareAppIcon>
                <ShareAppName>Gmail</ShareAppName>
              </ShareAppItem>

              <ShareAppItem onClick={() => handleShare('linkedin')}>
                <ShareAppIcon style={{ background: '#0077B5' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </ShareAppIcon>
                <ShareAppName>LinkedIn</ShareAppName>
              </ShareAppItem>

              <ShareAppItem onClick={() => handleShare('telegram')}>
                <ShareAppIcon style={{ background: '#0088CC' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </ShareAppIcon>
                <ShareAppName>Telegram</ShareAppName>
              </ShareAppItem>
            </ShareUsingGrid>
          </ShareUsingSection>
        </DialogContainer>
      </Overlay>

      {showQRCode && (
        <QRCodeModal onClick={() => setShowQRCode(false)}>
          <QRCodeContent onClick={(e) => e.stopPropagation()}>
            <QRCodeCloseButton onClick={() => setShowQRCode(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </QRCodeCloseButton>
            <img src={generateQRCode()} alt="QR Code" style={{ width: '200px', height: '200px' }} />
            <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>{t('common.scanToShare') || 'Scan to share'}</p>
          </QRCodeContent>
        </QRCodeModal>
      )}
    </>
  );
};

export default ShareDialog;

