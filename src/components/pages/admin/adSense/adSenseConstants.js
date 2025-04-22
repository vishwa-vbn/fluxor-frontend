export const adSenseConstants = {
    defaultAudience: {
      geo: [],
      device: [],
      interests: [],
      age_range: [],
    },
  
    defaultSchedule: {
      start: "",
      end: "",
      timezone: "UTC",
    },
  
    defaultDimensions: {
      width: 0,
      height: 0,
      unit: "px",
    },
  
    defaultCustomContent: {
      html: "",
      css: "",
      js: "",
      image_url: "",
      youtube_url: "",
      text: "",
      content_type: "url",
    },
  
    defaultAd: {
      name: "",
      code: "",
      ad_type: "banner",
      placement: "header",
      custom_content: {
        html: "",
        css: "",
        js: "",
        image_url: "",
        youtube_url: "",
        text: "",
        content_type: "url",
      },
      dimensions: { width: 0, height: 0, unit: "px" },
      is_active: true,
      target_pages: { match_type: "exact", paths: [] },
      target_audience: {
        geo: [],
        device: [],
        interests: [],
        age_range: [],
      },
      schedule: { start: "", end: "", timezone: "UTC" },
      priority: 0,
    },
  
    normalizeAdData: (ad) => ({
      id: ad.id || null,
      name: ad.name || "",
      code: ad.code || "",
      ad_type: ad.ad_type || "banner",
      placement: ad.placement || "header",
      custom_content: { ...adSenseConstants.defaultCustomContent, ...ad.custom_content },
      dimensions: { ...adSenseConstants.defaultDimensions, ...ad.dimensions },
      is_active: ad.is_active ?? true,
      target_pages: {
        match_type: ad.target_pages?.match_type || "exact",
        paths: Array.isArray(ad.target_pages?.paths) ? ad.target_pages.paths : [],
      },
      target_audience: { ...adSenseConstants.defaultAudience, ...ad.target_audience },
      schedule: { ...adSenseConstants.defaultSchedule, ...ad.schedule },
      priority: ad.priority || 0,
      status: ad.status || (ad.is_active ? "active" : "draft"),
      file: null,
    }),
  
    matchTypeOptions: [
      { value: "exact", label: "Exact Match" },
      { value: "prefix", label: "Starts With" },
      { value: "regex", label: "Regex Match" },
    ],
  
    deviceOptions: ["Mobile", "Desktop", "Tablet"].map((d) => ({
      label: d,
      value: d.toLowerCase(),
    })),
  
    ageRangeOptions: ["18-24", "25-34", "35-44", "45-54", "55+"].map((r) => ({
      label: r,
      value: r,
    })),
  
    interestOptions: ["Tech", "Finance", "Travel", "Fitness", "Gaming"].map((i) => ({
      label: i,
      value: i.toLowerCase(),
    })),
  
    geoOptions: ["US", "UK", "CA", "IN", "AU"].map((g) => ({
      label: g,
      value: g,
    })),
  
    contentTypeOptions: {
      banner: [
        { value: "url", label: "Image URL" },
        { value: "custom_image", label: "Upload Image" },
      ],
      video: [
        { value: "url", label: "YouTube URL" },
        { value: "custom_video", label: "Upload Video" },
      ],
      native: [{ value: "text", label: "Text Content" }],
      custom: [{ value: "code", label: "Custom Code" }],
    },
  
    densityOptions: [
      { value: "low", label: "Low" },
      { value: "balanced", label: "Balanced" },
      { value: "high", label: "High" },
    ],
  
    formatOptions: [
      { value: "banner", label: "Banner" },
      { value: "responsive", label: "Responsive" },
      { value: "native", label: "Native" },
    ],
  
    pageOptions: [
      { value: "all", label: "All Pages" },
      { value: "home", label: "Home Page" },
      { value: "posts", label: "Blog Posts" },
      { value: "custom", label: "Custom" },
    ],
  };