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
    const currentPlacements = adSettings?.placements || [];
    const updatedPlacements = isEnabled
      ? [...new Set([...currentPlacements, placement])]
      : currentPlacements.filter((p) => p !== placement);
    upsertAdSettings({
      ...adSettings,
      placements: updatedPlacements,
    });
  };

  handleAddCustomAd = (data) => {
    const { createAdUnit } = this.props;
    let adData = data;
    if (data instanceof FormData) {
      adData = JSON.parse(data.get("data") || "{}");
      adData.file = data.get("file");
    }
    createAdUnit({
      ...adData,
      is_active: adData.is_active !== undefined ? adData.is_active : true,
      status: adData.is_active ? "active" : "draft",
      code: adData.code || `AD-${Date.now()}`,
      priority: adData.priority || 0,
      target_pages: adData.target_pages || { match_type: "exact", paths: [] },
      target_audience: adData.target_audience || {},
      schedule: adData.schedule || {},
    });
  };

  handleUpdateCustomAd = ({ id, data }) => {
    const { updateAdUnit } = this.props;
    let adData = data;
    if (data instanceof FormData) {
      adData = JSON.parse(data.get("data") || "{}");
      adData.file = data.get("file");
    }
    updateAdUnit(id, {
      ...adData,
      status: adData.is_active ? "active" : "draft",
    });
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
      publisher_id,
      ad_client,
      ad_density,
      ad_format,
      target_pages,
    });
  };

  render() {
    const { adUnits, adSettings, loading, error } = this.props;

    return (
      <AdSenseManagerView
        publisherId={adSettings?.publisher_id || ""}
        adClient={adSettings?.ad_client || ""}
        placements={adSettings?.placements || []}
        adDensity={adSettings?.ad_density || "balanced"}
        adFormat={adSettings?.ad_format || "responsive"}
        targetPages={adSettings?.target_pages || "all"}
        adUnits={adUnits || []}
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
  adUnits: state.adSense?.adUnits?.data || [],
  adSettings: state.adSense?.adSettings?.data || {},
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