// import React from 'react';

// const AdBanner = ({ ad }) => {
//   const getDimensions = (ad) => {
//     const baseDimensions = {
//       header: { width: '100%', height: '90px', maxWidth: '1200px' },
//       sidebar: { width: '300px', height: '600px', maxWidth: '300px' },
//       in_content: { width: '100%', height: '250px', maxWidth: '728px' },
//       footer: { width: '100%', height: '90px', maxWidth: '1200px' },
//       custom: { width: '100%', height: 'auto', maxWidth: '100%' },
//     };

//     const placement = ad?.placement || 'custom';
//     const customDims = ad?.dimensions || { width: 0, height: 0 };
    
//     return {
//       width: customDims.width > 0 ? `${customDims.width}px` : baseDimensions[placement].width,
//       height: customDims.height > 0 ? `${customDims.height}px` : baseDimensions[placement].height,
//       maxWidth: baseDimensions[placement].maxWidth,
//     };
//   };

//   const dimensions = ad ? getDimensions(ad) : { width: '100%', height: 'auto', maxWidth: '100%' };

//   const renderContent = () => {
//     if (!ad) {
//       return <span className="text-gray-500">No Ad Preview</span>;
//     }
//     if (ad.ad_type === 'video' && ad.custom_content?.youtube_url) {
//       const videoId = ad.custom_content.youtube_url.match(/(?:v=)([^&]+)/)?.[1];
//       if (!videoId) {
//         return <span className="text-gray-500">Invalid YouTube URL</span>;
//       }
//       return (
//         <iframe
//           className="w-full h-full"
//           src={`https://www.youtube.com/embed/${videoId}`}
//           title={ad.name || 'Video Ad'}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         />
//       );
//     }
//     if (ad.ad_type === 'banner' && ad.custom_content?.image_url) {
//       return (
//         <img
//           src={ad.custom_content.image_url}
//           alt={ad.name || 'Banner Ad'}
//           className="w-full h-full object-contain"
//         />
//       );
//     }
//     if (ad.ad_type === 'native') {
//       return (
//         <div className="p-4 bg-gray-200">
//           <h4>{ad.name || 'Native Ad'}</h4>
//           <p>{ad.custom_content?.text || 'Native ad content'}</p>
//         </div>
//       );
//     }
//     if (ad.ad_type === 'custom' && ad.custom_content?.html) {
//       return <div dangerouslySetInnerHTML={{ __html: ad.custom_content.html }} />;
//     }
//     return <span className="text-gray-500">{ad.name || 'Ad Preview'}</span>;
//   };

//   return (
//     <div
//       className="bg-gray-100 flex items-center justify-center mx-auto"
//       style={{
//         width: dimensions.width,
//         height: dimensions.height,
//         maxWidth: dimensions.maxWidth,
//       }}
//     >
//       {renderContent()}
//     </div>
//   );
// };

// export default AdBanner;


import React from 'react';

const AdBanner = ({ ad }) => {
  const getDimensions = (ad) => {
    const baseDimensions = {
      header: { width: '100%', height: '90px', maxWidth: '1200px' },
      sidebar: { width: '300px', height: '600px', maxWidth: '300px' },
      in_content: { width: '100%', height: '250px', maxWidth: '728px' },
      footer: { width: '100%', height: '90px', maxWidth: '1200px' },
      custom: { width: '100%', height: 'auto', maxWidth: '100%' },
    };

    const placement = ad?.placement || 'custom';
    const customDims = ad?.dimensions || { width: 0, height: 0 };
    
    return {
      width: customDims.width > 0 ? `${customDims.width}px` : baseDimensions[placement].width,
      height: customDims.height > 0 ? `${customDims.height}px` : baseDimensions[placement].height,
      maxWidth: baseDimensions[placement].maxWidth,
    };
  };

  const dimensions = ad ? getDimensions(ad) : { width: '100%', height: 'auto', maxWidth: '100%' };

  const renderContent = () => {
    if (!ad) {
      return <span className="text-gray-500 dark:text-gray-400">No Ad Preview</span>;
    }
    if (ad.ad_type === 'video' && ad.custom_content?.youtube_url) {
      const videoId = ad.custom_content.youtube_url.match(/(?:v=)([^&]+)/)?.[1];
      if (!videoId) {
        return <span className="text-gray-500 dark:text-gray-400">Invalid YouTube URL</span>;
      }
      return (
        <iframe
          className="w-full h-full rounded-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={ad.name || 'Video Ad'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    if (ad.ad_type === 'banner' && ad.custom_content?.image_url) {
      return (
        <img
          src={ad.custom_content.image_url}
          alt={ad.name || 'Banner Ad'}
          className="w-full h-full object-contain rounded-md"
        />
      );
    }
    if (ad.ad_type === 'native') {
      return (
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h4 className="text-gray-900 dark:text-gray-100 font-medium">{ad.name || 'Native Ad'}</h4>
          <p className="text-gray-700 dark:text-gray-300">{ad.custom_content?.text || 'Native ad content'}</p>
        </div>
      );
    }
    if (ad.ad_type === 'custom' && ad.custom_content?.html) {
      return (
        <div
          className="text-gray-900 dark:text-gray-100"
          dangerouslySetInnerHTML={{ __html: ad.custom_content.html }}
        />
      );
    }
    return <span className="text-gray-500 dark:text-gray-400">{ad.name || 'Ad Preview'}</span>;
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto border border-gray-200 dark:border-gray-600 rounded-md"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        maxWidth: dimensions.maxWidth,
      }}
    >
      {renderContent()}
    </div>
  );
};

export default AdBanner;