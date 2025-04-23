import React, { useMemo } from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

// Mock LazyImage and LazyIframe components (replace with actual imports)
const LazyImage = ({ src, alt, style, className }) => (
  <img src={src} alt={alt} style={style} className={className} />
);
const LazyIframe = ({ width, height, src, title, frameBorder, allow, allowFullScreen, style, className }) => (
  <iframe
    width={width}
    height={height}
    src={src}
    title={title}
    frameBorder={frameBorder}
    allow={allow}
    allowFullScreen={allowFullScreen}
    style={style}
    className={className}
  />
);

// Constants for placement styles
const placementStyles = {
  header: {
    container: "w-full bg-teal-50 dark:bg-teal-900 p-2 flex justify-center rounded-lg shadow-sm transition-all duration-300",
    maxWidth: "1200px",
  },
  sidebar: {
    container: "w-full max-w-xs bg-teal-50 dark:bg-teal-900 p-2 rounded-lg shadow-sm transition-all duration-300",
    maxWidth: "300px",
  },
  in_content: {
    container: "w-full max-w-2xl bg-teal-50 dark:bg-teal-900 p-2 mx-auto rounded-lg shadow-sm transition-all duration-300",
    maxWidth: "728px",
  },
  footer: {
    container: "w-full bg-teal-50 dark:bg-teal-900 p-2 flex justify-center rounded-lg shadow-sm transition-all duration-300",
    maxWidth: "1200px",
  },
  custom: {
    container: "w-full bg-teal-50 dark:bg-teal-900 p-2 rounded-lg shadow-sm transition-all duration-300",
    maxWidth: "none",
  },
};

const AdPreview = ({ ad }) => {
  if (!ad) {
    return (
      <div className="text-gray-600 dark:text-gray-400 text-sm text-center" role="alert">
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
            <div className="overflow-hidden">
              <LazyImage
                src={custom_content.image_url}
                alt={name || "Advertisement"}
                style={{
                  width: dimensions.width ? `${dimensions.width}px` : "100%",
                  height: dimensions.height ? `${dimensions.height}px` : "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
                className="rounded-lg transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
          );
        }
        if (custom_content.html) {
          const sanitizedHTML = DOMPurify.sanitize(custom_content.html);
          return (
            <div
              className="overflow-hidden"
              dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
              style={{ maxWidth: "100%" }}
              aria-label="Banner advertisement"
            />
          );
        }
        return (
          <div className="text-gray-500 dark:text-gray-400 text-sm text-center" role="alert">
            No display content provided.
          </div>
        );

      case "video":
        if (custom_content.youtube_url) {
          const videoId = custom_content.youtube_url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?]+)/
          )?.[1];
          return videoId ? (
            <div className="overflow-hidden">
              <LazyIframe
                width={dimensions.width || "100%"}
                height={dimensions.height || "315"}
                src={`https://www.youtube.com/embed/${videoId}`}
                title={name || "YouTube video advertisement"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                className="rounded-lg transition-shadow duration-300 hover:shadow-md"
              />
            </div>
          ) : (
            <div className="text-red-600 dark:text-red-400 text-sm text-center" role="alert">
              Invalid YouTube URL.
            </div>
          );
        }
        return (
          <div className="text-gray-500 dark:text-gray-400 text-sm text-center" role="alert">
            No video URL provided.
          </div>
        );

      case "native":
        return (
          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" role="region" aria-label="Native ad">
            <p
              className="text-gray-800 dark:text-gray-200 text-sm truncate"
              title={custom_content.text || "No text provided."}
            >
              {custom_content.text || "No text provided."}
            </p>
          </div>
        );

      case "custom":
        const sanitizedHTML = DOMPurify.sanitize(custom_content.html || "<p>No HTML content provided.</p>");
        return (
          <div className="overflow-hidden" style={{ maxWidth: "100%" }} aria-label="Custom advertisement">
            {custom_content.css && <style>{custom_content.css}</style>}
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
            {custom_content.js && (
              <script dangerouslySetInnerHTML={{ __html: custom_content.js }} />
            )}
          </div>
        );

      default:
        return (
          <div className="text-gray-500 dark:text-gray-400 text-sm text-center" role="alert">
            Unsupported ad type: {ad_type}.
          </div>
        );
    }
  }, [ad_type, custom_content, dimensions, name]);

  return (
    <div className="space-y-2 p-2 bg-transparent">
      <div className="text-sm flex flex-col gap-1" role="region" aria-label="Ad details">
        <div className="px-2 py-1 truncate" title={name || "N/A"}>
          <strong className="font-bold">Ad Name:</strong>{" "}
          <span className="truncate bg-gray-100 dark:bg-gray-800 px-1 rounded">{name || "N/A"}</span>
        </div>
        <div className="px-2 py-1 truncate" title={ad_type || "N/A"}>
          <strong className="font-bold">Type:</strong>{" "}
          <span className="truncate bg-gray-100 dark:bg-gray-800 px-1 rounded">{ad_type || "N/A"}</span>
        </div>
        <div className="px-2 py-1 truncate" title={placement || "N/A"}>
          <strong className="font-bold">Placement:</strong>{" "}
          <span className="truncate bg-gray-100 dark:bg-gray-800 px-1 rounded">{placement || "N/A"}</span>
        </div>
        <div
          className="px-2 py-1 truncate"
          title={`${dimensions.width || "N/A"}x${dimensions.height || "N/A"} ${dimensions.unit || "px"}`}
        >
          <strong className="font-bold">Dimensions:</strong>{" "}
          <span className="truncate bg-gray-100 dark:bg-gray-800 px-1 rounded">
            {dimensions.width || "N/A"}x{dimensions.height || "N/A"} {dimensions.unit || "px"}
          </span>
        </div>
      </div>
      <div
        className={placementStyle.container}
        style={{
          maxWidth: placementStyle.maxWidth,
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {renderAdContent}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center" role="note">
        <p
          className="truncate"
          title="Note: This is a preview and may differ slightly on the live site due to responsive design or dynamic content."
        >
          Note: This is a preview and may differ slightly on the live site due to responsive design or dynamic content.
        </p>
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