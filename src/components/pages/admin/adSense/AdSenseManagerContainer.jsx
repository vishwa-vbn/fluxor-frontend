import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllAdUnits,
  createAdUnit,
  updateAdUnit,
  deleteAdUnit,
  getAdSettings,
  upsertAdSettings,
} from '../../../../store/adSense/adSenseActions';
import AdSenseManagerView from './AdSenseManagerView';

class AdSenseManagerContainer extends Component {
  componentDidMount() {
    this.props.getAllAdUnits();
    this.props.getAdSettings();
  }

  handleSaveAdSenseSettings = ({ publisherId, adClient }) => {
    const { adSettings, upsertAdSettings } = this.props;
    upsertAdSettings({
      ...adSettings,
      publisher_id: publisherId,
      ad_client: adClient,
    });
  };

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
      status: newAd.is_active ? 'active' : 'inactive',
      code: newAd.code || `AD-${Date.now()}`, // Generate unique code if not provided
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
      status: updatedAd.is_active ? 'active' : 'inactive',
    });
  };

  handleDeleteAdUnit = (adUnitId) => {
    const { deleteAdUnit } = this.props;
    if (window.confirm('Are you sure you want to delete this ad unit?')) {
      deleteAdUnit(adUnitId);
    }
  };

  handleSaveAdSettings = ({ adDensity, adFormat, targetPages }) => {
    const { adSettings, upsertAdSettings } = this.props;
    upsertAdSettings({
      ...adSettings,
      ad_density: adDensity,
      ad_format: adFormat,
      target_pages: targetPages,
    });
  };

  render() {
    const { adUnits, adSettings, loading, error } = this.props;

    return (
      <div className="container mx-auto p-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            Error: {error.message || 'An error occurred'}
          </div>
        )}
        <AdSenseManagerView
          publisherId={adSettings?.publisher_id || ''}
          adClient={adSettings?.ad_client || ''}
          placements={adSettings?.placements || []}
          adDensity={adSettings?.ad_density || 'balanced'}
          adFormat={adSettings?.ad_format || 'responsive'}
          targetPages={adSettings?.target_pages || 'all'}
          adUnits={adUnits || []}
          loading={loading}
          error={error}
          onSaveAdSenseSettings={this.handleSaveAdSenseSettings}
          onUpdatePlacement={this.handleUpdatePlacement}
          onAddCustomAd={this.handleAddCustomAd}
          onUpdateCustomAd={this.handleUpdateCustomAd}
          onDeleteAdUnit={this.handleDeleteAdUnit}
          onSaveAdSettings={this.handleSaveAdSettings}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  adUnits: state.adSense.adUnits.data,
  adSettings: state.adSense.adSettings.data,
  loading: state.adSense.loading,
  error: state.adSense.error,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllAdUnits,
  createAdUnit,
  updateAdUnit,
  deleteAdUnit,
  getAdSettings,
  upsertAdSettings,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdSenseManagerContainer);