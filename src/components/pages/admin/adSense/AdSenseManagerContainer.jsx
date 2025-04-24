// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   getAllAdUnits,
//   createAdUnit,
//   updateAdUnit,
//   deleteAdUnit,
//   getAdSettings,
//   upsertAdSettings,
//   initializeAdUnitSocket,
//   cleanupAdUnitSocket,
// } from "../../../../store/adSense/adSenseActions";
// import AdSenseManagerView from "./AdSenseManagerView";

// class AdSenseManagerContainer extends Component {
//   componentDidMount() {
//     this.props.getAllAdUnits();
//     this.props.getAdSettings();
//     this.props.initializeAdUnitSocket();
//   }

//   componentWillUnmount() {
//     this.props.cleanupAdUnitSocket();
//   }

//   handleUpdatePlacement = (placement, isEnabled) => {
//     const { adSettings, upsertAdSettings } = this.props;
//     const currentPlacements = Array.isArray(adSettings?.placements) ? adSettings.placements : [];
//     const updatedPlacements = isEnabled
//       ? [...new Set([...currentPlacements, placement])]
//       : currentPlacements.filter((p) => p !== placement);
//     upsertAdSettings({
//       ...adSettings,
//       placements: updatedPlacements,
//     });
//   };

//   handleAddCustomAd = (data) => {
//     console.log("handleAddCustomAd received data:", data);
//     const { createAdUnit } = this.props;

//     if (data instanceof FormData) {
//       console.log("Processing FormData in handleAddCustomAd");
//       for (const [key, value] of data.entries()) {
//         console.log(`FormData entry - ${key}:`, value);
//       }
//       createAdUnit(data);
//     } else {
//       console.log("Processing JSON data in handleAddCustomAd:", data);
//       if (
//         data.custom_content?.content_type === "custom_image" ||
//         data.custom_content?.content_type === "custom_video"
//       ) {
//         console.error("File is required for custom_image or custom_video");
//         return;
//       }
//       const normalizedData = {
//         ...data,
//         is_active: data.is_active !== undefined ? data.is_active : true,
//         status: data.is_active ? "active" : "paused",
//         code: data.code || `AD-${Date.now()}`,
//         priority: data.priority || 0,
//         target_pages: data.target_pages || { match_type: "exact", paths: [] },
//         target_audience: data.target_audience || {
//           geo: [],
//           device: [],
//           interests: [],
//           age_range: [],
//         },
//         schedule: data.schedule || { start: "", end: "", timezone: "UTC" },
//         dimensions: data.dimensions || { width: 0, height: 0, unit: "px" },
//         custom_content: {
//           ...data.custom_content,
//           html: data.custom_content?.html || "",
//           css: data.custom_content?.css || "",
//           js: data.custom_content?.js || "",
//           text: data.custom_content?.text || "",
//           image_url: data.custom_content?.image_url || "",
//           youtube_url: data.custom_content?.youtube_url || "",
//           content_type: data.custom_content?.content_type || "url",
//         },
//       };
//       createAdUnit(normalizedData);
//     }
//   };

//   handleUpdateCustomAd = ({ id, data }) => {
//     console.log("handleUpdateCustomAd received ID:", id, "data:", data);
//     const { updateAdUnit } = this.props;

//     if (data instanceof FormData) {
//       console.log("Processing FormData in handleUpdateCustomAd");
//       for (const [key, value] of data.entries()) {
//         console.log(`FormData entry - ${key}:`, value);
//       }
//       updateAdUnit(id, data);
//     } else {
//       console.log("Processing JSON data in handleUpdateCustomAd:", data);
//       const normalizedData = {
//         ...data,
//         status: data.is_active ? "active" : "paused",
//         target_pages: data.target_pages || { match_type: "exact", paths: [] },
//         target_audience: data.target_audience || {
//           geo: [],
//           device: [],
//           interests: [],
//           age_range: [],
//         },
//         schedule: data.schedule || { start: "", end: "", timezone: "UTC" },
//         dimensions: data.dimensions || { width: 0, height: 0, unit: "px" },
//         custom_content: {
//           ...data.custom_content,
//           html: data.custom_content?.html || "",
//           css: data.custom_content?.css || "",
//           js: data.custom_content?.js || "",
//           text: data.custom_content?.text || "",
//           image_url: data.custom_content?.image_url || "",
//           youtube_url: data.custom_content?.youtube_url || "",
//           content_type: data.custom_content?.content_type || "url",
//         },
//       };
//       updateAdUnit(id, normalizedData);
//     }
//   };

//   handleDeleteAdUnit = (adUnitId) => {
//     const { deleteAdUnit } = this.props;
//     if (window.confirm("Are you sure you want to delete this ad unit?")) {
//       deleteAdUnit(adUnitId);
//     }
//   };

//   handleSaveAdSettings = ({
//     publisher_id,
//     ad_client,
//     ad_density,
//     ad_format,
//     target_pages,
//   }) => {
//     const { upsertAdSettings } = this.props;
//     upsertAdSettings({
//       publisher_id: publisher_id || "",
//       ad_client: ad_client || "",
//       ad_density: ad_density || "balanced",
//       ad_format: ad_format || "responsive",
//       target_pages: target_pages || "all",
//       placements: this.props.adSettings?.placements || [],
//     });
//   };

//   render() {
//     const { adUnits, adSettings, loading, error } = this.props;

//     return (
//       <AdSenseManagerView
//         publisherId={adSettings?.publisher_id || ""}
//         adClient={adSettings?.ad_client || ""}
//         placements={Array.isArray(adSettings?.placements) ? adSettings.placements : []}
//         adDensity={adSettings?.ad_density || "balanced"}
//         adFormat={adSettings?.ad_format || "responsive"}
//         targetPages={adSettings?.target_pages || "all"}
//         adUnits={Array.isArray(adUnits) ? adUnits : []}
//         loading={loading}
//         error={error}
//         onUpdatePlacement={this.handleUpdatePlacement}
//         onAddCustomAd={this.handleAddCustomAd}
//         onUpdateCustomAd={this.handleUpdateCustomAd}
//         onDeleteAdUnit={this.handleDeleteAdUnit}
//         onSaveAdSettings={this.handleSaveAdSettings}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   adUnits: Array.isArray(state.adSense?.adUnits) ? state.adSense.adUnits : [],
//   adSettings: state.adSense?.adSettings || {},
//   loading: state.adSense?.loading || false,
//   error: state.adSense?.error || null,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getAllAdUnits,
//       createAdUnit,
//       updateAdUnit,
//       deleteAdUnit,
//       getAdSettings,
//       upsertAdSettings,
//       initializeAdUnitSocket,
//       cleanupAdUnitSocket,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(AdSenseManagerContainer);


import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllAdUnits,
  createAdUnit,
  updateAdUnit,
  deleteAdUnit,
  getAdSettings,
  upsertAdSettings,
  initializeAdUnitSocket,
  cleanupAdUnitSocket,
} from "../../../../store/adSense/adSenseActions";
import AdSenseManagerView from "./AdSenseManagerView";

class AdSenseManagerContainer extends Component {
  componentDidMount() {
    this.props.getAllAdUnits();
    this.props.getAdSettings();
    this.props.initializeAdUnitSocket();
  }

  componentWillUnmount() {
    this.props.cleanupAdUnitSocket();
  }

  handleUpdatePlacement = (placement, isEnabled) => {
    const { adSettings, upsertAdSettings } = this.props;
    const currentPlacements = Array.isArray(adSettings?.placements) ? adSettings.placements : [];
    const updatedPlacements = isEnabled
      ? [...new Set([...currentPlacements, placement])]
      : currentPlacements.filter((p) => p !== placement);
    upsertAdSettings({
      ...adSettings,
      placements: updatedPlacements,
    });
  };

  handleAddCustomAd = (data) => {
    console.log("handleAddCustomAd received data:", data);
    const { createAdUnit } = this.props;

    if (data instanceof FormData) {
      console.log("Processing FormData in handleAddCustomAd");
      for (const [key, value] of data.entries()) {
        console.log(`FormData entry - ${key}:`, value);
      }
      createAdUnit(data);
    } else {
      console.log("Processing JSON data in handleAddCustomAd:", data);
      if (
        data.custom_content?.content_type === "custom_image" &&
        !data.custom_content.image_url
      ) {
        console.error("Image URL is required for custom_image");
        return;
      }
      if (
        data.custom_content?.content_type === "custom_video" &&
        !data.custom_content.youtube_url
      ) {
        console.error("Video URL is required for custom_video");
        return;
      }
      const normalizedData = {
        ...data,
        is_active: data.is_active !== undefined ? data.is_active : true,
        status: data.is_active ? "active" : "paused",
        code: data.code || `AD-${Date.now()}`,
        priority: data.priority || 0,
        target_pages: data.target_pages || { match_type: "exact", paths: [] },
        target_audience: data.target_audience || {
          geo: [],
          device: [],
          interests: [],
          age_range: [],
        },
        schedule: data.schedule || { start: "", end: "", timezone: "UTC" },
        dimensions: data.dimensions || { width: 0, height: 0, unit: "px" },
        custom_content: {
          ...data.custom_content,
          html: data.custom_content?.html || "",
          css: data.custom_content?.css || "",
          js: data.custom_content?.js || "",
          text: data.custom_content?.text || "",
          image_url: data.custom_content?.image_url || "",
          youtube_url: data.custom_content?.youtube_url || "",
          content_type: data.custom_content?.content_type || "url",
        },
      };
      createAdUnit(normalizedData);
    }
  };

  handleUpdateCustomAd = ({ id, data }) => {
    console.log("handleUpdateCustomAd received ID:", id, "data:", data);
    const { updateAdUnit } = this.props;

    if (data instanceof FormData) {
      console.log("Processing FormData in handleUpdateCustomAd");
      for (const [key, value] of data.entries()) {
        console.log(`FormData entry - ${key}:`, value);
      }
      updateAdUnit(id, data);
    } else {
      console.log("Processing JSON data in handleUpdateCustomAd:", data);
      const normalizedData = {
        ...data,
        status: data.is_active ? "active" : "paused",
        target_pages: data.target_pages || { match_type: "exact", paths: [] },
        target_audience: data.target_audience || {
          geo: [],
          device: [],
          interests: [],
          age_range: [],
        },
        schedule: data.schedule || { start: "", end: "", timezone: "UTC" },
        dimensions: data.dimensions || { width: 0, height: 0, unit: "px" },
        custom_content: {
          ...data.custom_content,
          html: data.custom_content?.html || "",
          css: data.custom_content?.css || "",
          js: data.custom_content?.js || "",
          text: data.custom_content?.text || "",
          image_url: data.custom_content?.image_url || "",
          youtube_url: data.custom_content?.youtube_url || "",
          content_type: data.custom_content?.content_type || "url",
        },
      };
      updateAdUnit(id, normalizedData);
    }
  };

  handleDeleteAdUnit = (adUnitId) => {
    const { deleteAdUnit } = this.props;
    if (window.confirm("Are you sure you want to delete this ad unit?")) {
      deleteAdUnit(adUnitId);
    }
  };

  handleSaveAdSettings = ({
    publisher_id,
    ad_client,
    ad_density,
    ad_format,
    target_pages,
  }) => {
    const { upsertAdSettings } = this.props;
    upsertAdSettings({
      publisher_id: publisher_id || "",
      ad_client: ad_client || "",
      ad_density: ad_density || "balanced",
      ad_format: ad_format || "responsive",
      target_pages: target_pages || "all",
      placements: this.props.adSettings?.placements || [],
    });
  };

  render() {
    const { adUnits, adSettings, loading, error } = this.props;

    return (
      <AdSenseManagerView
        publisherId={adSettings?.publisher_id || ""}
        adClient={adSettings?.ad_client || ""}
        placements={Array.isArray(adSettings?.placements) ? adSettings.placements : []}
        adDensity={adSettings?.ad_density || "balanced"}
        adFormat={adSettings?.ad_format || "responsive"}
        targetPages={adSettings?.target_pages || "all"}
        adUnits={Array.isArray(adUnits) ? adUnits : []}
        loading={loading}
        error={error}
        onUpdatePlacement={this.handleUpdatePlacement}
        onAddCustomAd={this.handleAddCustomAd}
        onUpdateCustomAd={this.handleUpdateCustomAd}
        onDeleteAdUnit={this.handleDeleteAdUnit}
        onSaveAdSettings={this.handleSaveAdSettings}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  adUnits: Array.isArray(state.adSense?.adUnits) ? state.adSense.adUnits : [],
  adSettings: state.adSense?.adSettings || {},
  loading: state.adSense?.loading || false,
  error: state.adSense?.error || null,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllAdUnits,
      createAdUnit,
      updateAdUnit,
      deleteAdUnit,
      getAdSettings,
      upsertAdSettings,
      initializeAdUnitSocket,
      cleanupAdUnitSocket,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdSenseManagerContainer);