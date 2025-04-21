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

  handleAddCustomAd = (newAd) => {
    const { createAdUnit } = this.props;
    createAdUnit({
      ...newAd,
      is_active: newAd.is_active !== undefined ? newAd.is_active : true,
      status: newAd.is_active ? "active" : "inactive",
      code: newAd.code || `AD-${Date.now()}`,
      priority: newAd.priority || 0,
      target_pages: newAd.target_pages || [],
      target_audience: newAd.target_audience || {},
      schedule: newAd.schedule || {},
    });
  };

  handleUpdateCustomAd = (updatedAd) => {
    const { updateAdUnit } = this.props;
    updateAdUnit(updatedAd.id, {
      ...updatedAd,
      status: updatedAd.is_active ? "active" : "inactive",
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
  adUnits: state.adSense?.adUnits?.data,
  adSettings: state.adSense?.adSettings?.data,
  loading: state.adSense.loading,
  error: state.adSense.error,
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