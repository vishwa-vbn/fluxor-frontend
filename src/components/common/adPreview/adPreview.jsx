import React, { useMemo } from "react";

const placementStyles = {
  header: {
    container: "w-full bg-gray-100 p-4 flex justify-center",
    maxWidth: "1200px",
  },
  sidebar: {
    container: "w-64 bg-gray-100 p-4",
    maxWidth: "300px",
  },
  in_content: {
    container: "w-full max-w-3xl bg-gray-100 p-4 mx-auto",
    maxWidth: "728px",
  },
  footer: {
    container: "w-full bg-gray-100 p-4 flex justify-center",
    maxWidth: "1200px",
  },
  custom: {
    container: "w-full bg-gray-100 p-4",
    maxWidth: "none",
  },
};

const AdPreview = ({ ad }) => {
  if (!ad) {
    return <div className="text-gray-600">No ad selected for preview.</div>;
  }

  const { ad_type, custom_content, dimensions, placement } = ad;
  const placementStyle = placementStyles[placement] || placementStyles.custom;

  const renderAdContent = useMemo(() => {
    switch (ad_type) {
      case "display":
        if (custom_content.image_url) {
          return (
            <img
              src={custom_content.image_url}
              alt={ad.name}
              style={{
                width: dimensions.width ? `${dimensions.width}px` : "100%",
                height: dimensions.height ? `${dimensions.height}px` : "auto",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          );
        }
        if (custom_content.html) {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: custom_content.html }}
              style={{ maxWidth: "100%", overflow: "hidden" }}
            />
          );
        }
        return <div className="text-gray-500">No display content provided.</div>;

      case "video":
        if (custom_content.youtube_url) {
          const videoId = custom_content.youtube_url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?]+)/
          )?.[1];
          return videoId ? (
            <iframe
              width={dimensions.width || "100%"}
              height={dimensions.height || "315"}
              src={`https://www.youtube.com/embed/${videoId}`}
              title={ad.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ maxWidth: "100%" }}
            />
          ) : (
            <div className="text-red-600">Invalid YouTube URL.</div>
          );
        }
        return <div className="text-gray-500">No video URL provided.</div>;

      case "native":
        return (
          <div className="p-4 bg-white rounded shadow">
            <p className="text-gray-800">{custom_content.text || "No text provided."}</p>
          </div>
        );

      case "custom":
        return (
          <div style={{ maxWidth: "100%", overflow: "hidden" }}>
            {custom_content.css && (
              <style>{custom_content.css}</style>
            )}
            <div dangerouslySetInnerHTML={{ __html: custom_content.html || "<p>No HTML content provided.</p>" }} />
            {custom_content.js && (
              <script>{custom_content.js}</script>
            )}
          </div>
        );

      default:
        return <div className="text-gray-500">Unsupported ad type.</div>;
    }
  }, [ad_type, custom_content, dimensions, ad.name]);

  return (
    <div className="space-y-4 p-4">
      <div className="text-sm text-gray-600">
        <p><strong>Ad Name:</strong> {ad.name}</p>
        <p><strong>Type:</strong> {ad_type}</p>
        <p><strong>Placement:</strong> {placement}</p>
        <p>
          <strong>Dimensions:</strong> {dimensions.width}x{dimensions.height} {dimensions.unit}
        </p>
      </div>
      <div
        className={placementStyle.container}
        style={{
          maxWidth: placementStyle.maxWidth,
          margin: "0 auto",
          border: "1px solid #e5e7eb",
        }}
      >
        {renderAdContent}
      </div>
      <div className="text-xs text-gray-500">
        <p>Note: This is a preview and may differ slightly on the live site due to responsive design or dynamic content.</p>
      </div>
    </div>
  );
};

export default AdPreview;