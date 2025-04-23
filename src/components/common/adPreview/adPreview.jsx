import React, { useMemo, Suspense, lazy } from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

// Lazy load media components
const LazyImage = lazy(() => import("./LazyImage"));
const LazyIframe = lazy(() => import("./LazyIframe"));

// Constants for placement styles
const placementStyles = {
  header: {
    container: "w-full bg-gray-100 dark:bg-gray-800 p-4 flex justify-center rounded-lg shadow-sm transition-all duration-300",
    maxWidth: "1200px",
  },
  sidebar: {
    container: "w-64 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm",
    maxWidth: "300px",
  },
  in_content: {
    container: "w-full max-w-3xl bg-gray-100 dark:bg-gray-800 p-4 mx-auto rounded-lg shadow-sm",
    maxWidth: "728px",
  },
  footer: {
    container: "w-full bg-gray-100 dark:bg-gray-800 p-4 flex justify-center rounded-lg shadow-sm",
    maxWidth: "1200px",
  },
  custom: {
    container: "w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm",
    maxWidth: "none",
  },
};

// CSS Variables for theming
const themeStyles = `
  :root {
    --ad-border: #e5e7eb;
    --ad-text: #4b5563;
    --ad-bg: #f9fafb;
  }
  .dark {
    --ad-border: #374151;
    --ad-text: #d1d5db;
    --ad-bg: #1f2937;
  }
`;

const AdPreview = ({ ad }) => {
  if (!ad) {
    return (
      <div className="text-gray-600 dark:text-gray-400" role="alert">
        No ad selected for preview.
      </div>
    );
  }

  const { ad_type, custom_content = {}, dimensions = {}, placement, name } = ad;
  const placementStyle = useMemo(() => placementStyles[placement] || placementStyles.custom, [placement]);

  const renderAdContent = useMemo(() => {
    switch (ad_type) {
      case "banner":
        if (custom_content.image_url) {
          return (
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 w-full" />}>
              <LazyImage
                src={custom_content.image_url}
                alt={name || "Advertisement"}
                style={{
                  width: dimensions.width ? `${dimensions.width}px` : "100%",
                  height: dimensions.height ? `${dimensions.height}px` : "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                className="rounded-md hover:scale-105 transition-transform duration-200"
              />
            </Suspense>
          );
        }
        if (custom_content.html) {
          const sanitizedHTML = DOMPurify.sanitize(custom_content.html);
          return (
            <div
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
              style={{ maxWidth: "100%", overflow: "hidden" }}
              aria-label="Banner advertisement"
            />
          );
        }
        return (
          <div className="text-gray-500 dark:text-gray-400" role="alert">
            No display content provided.
          </div>
        );

      case "video":
        if (custom_content.youtube_url) {
          const videoId = custom_content.youtube_url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?]+)/
          )?.[1];
          return videoId ? (
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 w-full" />}>
              <LazyIframe
                width={dimensions.width || "100%"}
                height={dimensions.height || "315"}
                src={`https://www.youtube.com/embed/${videoId}`}
                title={name || "YouTube video advertisement"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ maxWidth: "100%", borderRadius: "8px" }}
                className="hover:shadow-lg transition-shadow duration-200"
              />
            </Suspense>
          ) : (
            <div className="text-red-600 dark:text-red-400" role="alert">
              Invalid YouTube URL.
            </div>
          );
        }
        return (
          <div className="text-gray-500 dark:text-gray-400" role="alert">
            No video URL provided.
          </div>
        );

      case "native":
        return (
          <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md" role="region" aria-label="Native ad">
            <p className="text-gray-800 dark:text-gray-200">
              {custom_content.text || "No text provided."}
            </p>
          </div>
        );

      case "custom":
        const sanitizedHTML = DOMPurify.sanitize(custom_content.html || "<p>No HTML content provided.</p>");
        return (
          <div style={{ maxWidth: "100%", overflow: "hidden" }} aria-label="Custom advertisement">
            {custom_content.css && <style>{custom_content.css}</style>}
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            {custom_content.js && (
              <script dangerouslySetInnerHTML={{ __html: custom_content.js }} />
            )}
          </div>
        );

      default:
        return (
          <div className="text-gray-500 dark:text-gray-400" role="alert">
            Unsupported ad type: {ad_type}.
          </div>
        );
    }
  }, [ad_type, custom_content, dimensions, name]);

  return (
    <div className="space-y-4 p-4 bg-[var(--ad-bg)] text-[var(--ad-text)]">
      <style>{themeStyles}</style>
      <div className="text-sm" role="region" aria-label="Ad details">
        <p><strong>Ad Name:</strong> {name}</p>
        <p><strong>Type:</strong> {ad_type}</p>
        <p><strong>Placement:</strong> {placement}</p>
        <p>
          <strong>Dimensions:</strong> {dimensions.width || "N/A"}x{dimensions.height || "N/A"} {dimensions.unit || "px"}
        </p>
      </div>
      <div
        className={placementStyle.container}
        style={{
          maxWidth: placementStyle.maxWidth,
          margin: "0 auto",
          border: "1px solid var(--ad-border)",
        }}
        role="region"
        aria-label="Ad preview"
      >
        {renderAdContent}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400" role="note">
        <p>Note: This is a preview and may differ slightly on the live site due to responsive design or dynamic content.</p>
      </div>
    </div>
  );
};

AdPreview.propTypes = {
  ad: PropTypes.shape({
    name: PropTypes.string,
    ad_type: PropTypes.oneOf(["banner", "video", "native", "custom"]).isRequired,
    custom_content: PropTypes.object,
    dimensions: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      unit: PropTypes.string,
    }),
    placement: PropTypes.oneOf(["header", "sidebar", "in_content", "footer", "custom"]).isRequired,
  }),
};

export default AdPreview;