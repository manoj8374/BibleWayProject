import React, { useState, useEffect, useCallback } from "react";
import {
  wallpaperService,
  type Wallpaper,
} from "../../services/wallpaper/wallpaper.service";
import { showError } from "../../utils/toast";
import { useI18n } from "../../i18n/hooks";
import {
  PageContainer,
  PageTitle,
  WallpapersGrid,
  WallpaperCard,
  WallpaperImage,
  LoadingContainer,
  EmptyState,
  EmptyStateText,
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalImage,
  ModalDownloadButton,
  ModalCloseButton,
} from "./DownloadsPage.styles";

const DownloadsPage: React.FC = () => {
  const { t } = useI18n();
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWallpapers = useCallback(async () => {
    setLoading(true);
    const response = await wallpaperService.getAllWallpapers();
    if (response.success) {
      setWallpapers(response.data);
    } else {
      showError(
        response.message || t("pages.downloadsPage.failedToLoadWallpapers")
      );
    }
    setLoading(false);
  }, [t]);

  useEffect(() => {
    fetchWallpapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedWallpaper(null);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup: restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen, handleCloseModal]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownload = async (wallpaper: any) => {
    console.log(wallpaper);
    if (downloadingIds.has(wallpaper.wallpaper_id)) {
      return; // Already downloading
    }

    setDownloadingIds((prev) => new Set(prev).add(wallpaper.wallpaper_id));

    try {
      console.log(wallpaper.image_url);
      const response = await fetch(wallpaper.image_url, {
        mode: "cors",
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const fileName = wallpaper.image_url.split("/").pop() || "wallpaper.jpg";

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      a.style.display = "none";
      a.setAttribute("download", fileName);
      document.body.appendChild(a);

      // Use requestAnimationFrame to ensure the element is in the DOM
      requestAnimationFrame(() => {
        // Trigger download
        a.click();

        // Wait a bit before cleaning up to ensure download starts
        setTimeout(() => {
          if (document.body.contains(a)) {
            document.body.removeChild(a);
          }
          window.URL.revokeObjectURL(blobUrl);
        }, 200);
      });

      setDownloadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(wallpaper.wallpaper_id);
        return newSet;
      });
    } catch (error) {
      console.error("Error downloading wallpaper:", error);
      // Fallback: try direct download link
      try {
        const a = document.createElement("a");
        a.href = wallpaper.image_url;
        a.download = wallpaper.image_url.split("/").pop() || "wallpaper.jpg";
        a.target = "_blank";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          if (document.body.contains(a)) {
            document.body.removeChild(a);
          }
        }, 100);
      } catch (fallbackError) {
        console.error("Fallback download also failed:", fallbackError);
        showError(t("pages.downloadsPage.failedToDownload"));
      }
      setDownloadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(wallpaper.wallpaper_id);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          {t("pages.downloadsPage.loadingWallpapers")}
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>{t("pages.downloadsPage.downloads")}</PageTitle>
      {wallpapers.length === 0 ? (
        <EmptyState>
          <EmptyStateText>
            {t("pages.downloadsPage.noWallpapersAvailable")}
          </EmptyStateText>
        </EmptyState>
      ) : (
        <WallpapersGrid>
          {wallpapers.map((wallpaper) => (
            <WallpaperCard key={wallpaper.wallpaper_id}>
              <WallpaperImage
                src={wallpaper.image_url}
                alt={wallpaper.filename}
                onClick={() => handleOpenModal(wallpaper)}
              />
            </WallpaperCard>
          ))}
        </WallpapersGrid>
      )}

      {isModalOpen && selectedWallpaper && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={handleCloseModal} aria-label="Close">
              ×
            </ModalCloseButton>
            <ModalContent>
              <ModalImage
                src={selectedWallpaper.image_url}
                alt={selectedWallpaper.filename}
              />
              <ModalDownloadButton
                onClick={() => handleDownload(selectedWallpaper)}
                disabled={downloadingIds.has(selectedWallpaper.wallpaper_id)}
              >
                {downloadingIds.has(selectedWallpaper.wallpaper_id)
                  ? t("pages.downloadsPage.downloading")
                  : t("pages.downloadsPage.download")}
              </ModalDownloadButton>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default DownloadsPage;
