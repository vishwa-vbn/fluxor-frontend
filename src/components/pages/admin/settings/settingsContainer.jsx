import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SettingsView from "./settingsView";
import {
  createSetting,
  getAllSettings,
  updateSetting,
  deleteSetting,
  initializeSettingSocket,
  cleanupSettingSocket,
} from "../../../../store/settings/settingsAction";
import { showAlert } from "../../../../store/alert/alertActions";

class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        general: {
          site_name: "",
          site_url: "",
          site_description: "",
          maintenance_mode: false,
          posts_per_page: 10,
          excerpt_length: 35,
          comments_enabled: true,
          moderate_comments: true,
        },
        appearance: {
          color_scheme: "system",
          primary_color: "blue",
          font_family: "inter",
          show_sidebar: true,
          show_related: true,
          show_author: true,
        },
        seo: {
          meta_title: "",
          meta_description: "",
          canonical_url: "",
          enable_robots: true,
          enable_sitemap: true,
          og_title: "",
          og_description: "",
          og_image: "",
        },
        advanced: {
          custom_css: "",
          header_scripts: "",
          footer_scripts: "",
          enable_cache: true,
          cache_duration: 60,
          debug_mode: false,
        },
      },
      activeTab: "general",
    };
  }

  componentDidMount() {
    this.props.initializeSettingSocket();
    this.props.getAllSettings();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.settings !== this.props.settings.settings) {
      this.initializeFormData();
    }
  }

  componentWillUnmount() {
    this.props.cleanupSettingSocket();
  }

  initializeFormData = () => {
    const { settings } = this.props;
    const settingsMap = settings.settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});

    // Helper function to parse string values
    const parseValue = (key, value, defaultValue) => {
      if (value === undefined || value === null) return defaultValue;
      if (key.includes("enabled") || key.includes("mode") || key.includes("robots") || key.includes("sitemap")) {
        return value === "true" ? true : value === "false" ? false : defaultValue;
      }
      if (key.includes("per_page") || key.includes("length") || key.includes("duration")) {
        const parsed = parseInt(value);
        return isNaN(parsed) ? defaultValue : parsed;
      }
      return value || defaultValue;
    };

    this.setState({
      formData: {
        general: {
          site_name: parseValue("site_name", settingsMap.site_name, ""),
          site_url: parseValue("site_url", settingsMap.site_url, ""),
          site_description: parseValue("site_description", settingsMap.site_description, ""),
          maintenance_mode: parseValue("maintenance_mode", settingsMap.maintenance_mode, false),
          posts_per_page: parseValue("posts_per_page", settingsMap.posts_per_page, 10),
          excerpt_length: parseValue("excerpt_length", settingsMap.excerpt_length, 35),
          comments_enabled: parseValue("comments_enabled", settingsMap.comments_enabled, true),
          moderate_comments: parseValue("moderate_comments", settingsMap.moderate_comments, true),
        },
        appearance: {
          color_scheme: parseValue("color_scheme", settingsMap.color_scheme, "system"),
          primary_color: parseValue("primary_color", settingsMap.primary_color, "blue"),
          font_family: parseValue("font_family", settingsMap.font_family, "inter"),
          show_sidebar: parseValue("show_sidebar", settingsMap.show_sidebar, true),
          show_related: parseValue("show_related", settingsMap.show_related, true),
          show_author: parseValue("show_author", settingsMap.show_author, true),
        },
        seo: {
          meta_title: parseValue("meta_title", settingsMap.meta_title, ""),
          meta_description: parseValue("meta_description", settingsMap.meta_description, ""),
          canonical_url: parseValue("canonical_url", settingsMap.canonical_url, ""),
          enable_robots: parseValue("enable_robots", settingsMap.enable_robots, true),
          enable_sitemap: parseValue("enable_sitemap", settingsMap.enable_sitemap, true),
          og_title: parseValue("og_title", settingsMap.og_title, ""),
          og_description: parseValue("og_description", settingsMap.og_description, ""),
          og_image: parseValue("og_image", settingsMap.og_image, ""),
        },
        advanced: {
          custom_css: parseValue("custom_css", settingsMap.custom_css, ""),
          header_scripts: parseValue("header_scripts", settingsMap.header_scripts, ""),
          footer_scripts: parseValue("footer_scripts", settingsMap.footer_scripts, ""),
          enable_cache: parseValue("enable_cache", settingsMap.enable_cache, true),
          cache_duration: parseValue("cache_duration", settingsMap.cache_duration, 60),
          debug_mode: parseValue("debug_mode", settingsMap.debug_mode, false),
        },
      },
    });
  };

  handleInputChange = (group, key, value) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [group]: {
          ...prevState.formData[group],
          [key]: value,
        },
      },
    }));
  };

  handleSwitchChange = (group, key, checked) => {
    this.handleInputChange(group, key, checked);
  };

  handleSelectorChange = (group, key, value) => {
    this.handleInputChange(group, key, value);
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleSave = async (tab) => {
    const { formData } = this.state;
    const { updateSetting, createSetting, showAlert } = this.props;

    try {
      const settingsToSave = Object.entries(formData[tab]).map(([key, value]) => ({
        key,
        value: String(value), // Convert to string for TEXT column
        group: tab,
      }));

      for (const setting of settingsToSave) {
        const existingSetting = this.props.settings.settings.find(
          (s) => s.key === setting.key
        );
        if (existingSetting) {
          await updateSetting(setting.key, { value: setting.value });
        } else {
          await createSetting(setting);
        }
      }

      showAlert({
        isOpen: true,
        title: "Success",
        type: "success",
        msg: `${tab.charAt(0).toUpperCase() + tab.slice(1)} settings saved successfully.`,
      });
    } catch (error) {
      console.error(`Save ${tab} Settings Error:`, error);
      showAlert({
        isOpen: true,
        title: "Error",
        type: "error",
        msg: `Failed to save ${tab} settings.`,
      });
    }
  };

  handleReset = async () => {
    const { deleteSetting, showAlert } = this.props;
    try {
      for (const setting of this.props.settings.settings) {
        await deleteSetting(setting.key);
      }

      this.setState({
        formData: {
          general: {
            site_name: "",
            site_url: "",
            site_description: "",
            maintenance_mode: false,
            posts_per_page: 10,
            excerpt_length: 35,
            comments_enabled: true,
            moderate_comments: true,
          },
          appearance: {
            color_scheme: "system",
            primary_color: "blue",
            font_family: "inter",
            show_sidebar: true,
            show_related: true,
            show_author: true,
          },
          seo: {
            meta_title: "",
            meta_description: "",
            canonical_url: "",
            enable_robots: true,
            enable_sitemap: true,
            og_title: "",
            og_description: "",
            og_image: "",
          },
          advanced: {
            custom_css: "",
            header_scripts: "",
            footer_scripts: "",
            enable_cache: true,
            cache_duration: 60,
            debug_mode: false,
          },
        },
      });

      showAlert({
        isOpen: true,
        title: "Success",
        type: "success",
        msg: "Settings reset to default.",
      });
    } catch (error) {
      console.error("Reset Settings Error:", error);
      showAlert({
        isOpen: true,
        title: "Error",
        type: "error",
        msg: "Failed to reset settings.",
      });
    }
  };

  handleClearCache = async () => {
    const { updateSetting, showAlert } = this.props;
    try {
      await updateSetting("enable_cache", { value: "false" });
      showAlert({
        isOpen: true,
        title: "Success",
        type: "success",
        msg: "Cache cleared successfully.",
      });
    } catch (error) {
      console.error("Clear Cache Error:", error);
      showAlert({
        isOpen: true,
        title: "Error",
        type: "error",
        msg: "Failed to clear cache.",
      });
    }
  };

  handleExport = () => {
    const { settings, showAlert } = this.props;
    try {
      const dataStr = JSON.stringify(settings.settings, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "settings-export.json";
      link.click();
      URL.revokeObjectURL(url);

      showAlert({
        isOpen: true,
        title: "Success",
        type: "success",
        msg: "Data exported successfully.",
      });
    } catch (error) {
      console.error("Export Settings Error:", error);
      showAlert({
        isOpen: true,
        title: "Error",
        type: "error",
        msg: "Failed to export data.",
      });
    }
  };

  render() {
    const { formData, activeTab } = this.state;
    const { settings } = this.props;

    return (
      <SettingsView
        formData={formData}
        isLoading={settings.loading}
        onInputChange={this.handleInputChange}
        onSwitchChange={this.handleSwitchChange}
        onSelectorChange={this.handleSelectorChange}
        onSave={this.handleSave}
        onReset={this.handleReset}
        onClearCache={this.handleClearCache}
        onExport={this.handleExport}
        activeTab={activeTab}
        onTabChange={this.handleTabChange}
        settings={formData}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createSetting,
      getAllSettings,
      updateSetting,
      deleteSetting,
      initializeSettingSocket,
      cleanupSettingSocket,
      showAlert,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);