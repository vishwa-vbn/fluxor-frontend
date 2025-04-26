import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AnalyticsView from "./AnalyticsView";
import {
  getDashboardStats,
  getWeeklyTrafficData,
  getUserGrowthData,
  getQuickStats,
} from "../../../../utils"; // Adjust path as needed

const AnalyticsContainer = ({ auth, posts, initializeAnalyticsSocket, cleanupAnalyticsSocket }) => {
  const [stats, setStats] = useState({
    viewsCount: 0,
    avgReadTime: "0 min",
    bounceRate: "0%",
  });
  const [weeklyTrafficData, setWeeklyTrafficData] = useState({
    labels: [],
    datasets: [],
  });
  const [userGrowthData, setUserGrowthData] = useState({
    labels: [],
    datasets: [],
  });
  const [trafficSources, setTrafficSources] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data on mount
  useEffect(() => {
    try {
      const statsData = getDashboardStats() || {};
      const trafficData = getWeeklyTrafficData() || { labels: [], datasets: [] };
      const growthData = getUserGrowthData() || { labels: [], datasets: [] };
      const quickStats = getQuickStats() || {};

      setStats({
        viewsCount: statsData.viewsCount || 0,
        avgReadTime: quickStats.avgReadTime || "0 min",
        bounceRate: quickStats.bounceRate || "0%",
      });
      setWeeklyTrafficData(trafficData);
      setUserGrowthData(growthData);

      // Mock traffic sources (replace with actual data if available)
      setTrafficSources([
        { source: "Direct", percentage: 35, value: 4200 },
        { source: "Search", percentage: 28, value: 3360 },
        { source: "Social Media", percentage: 22, value: 2640 },
        { source: "Referrals", percentage: 15, value: 1800 },
      ]);

      // Initialize socket (if applicable)
      initializeAnalyticsSocket();
    } catch (error) {
      console.error("AnalyticsContainer: Error fetching data", error);
      // Set fallback data to prevent undefined errors
      setWeeklyTrafficData({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Page Views",
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: "#1e40af",
            backgroundColor: "#1e40af33",
            tension: 0.4,
            fill: true,
          },
        ],
      });
      setUserGrowthData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "User Growth",
            data: [0, 0, 0, 0, 0, 0],
            borderColor: "#0f766e",
            backgroundColor: "#0f766e33",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    }

    // Cleanup on unmount
    return () => {
      cleanupAnalyticsSocket();
    };
  }, [initializeAnalyticsSocket, cleanupAnalyticsSocket]);

  // Handle search
  const handleSearch = (query) => {
    setSearch(query);
    // Add filtering logic if needed
  };

  // User data for TopNavbar
  const userData = {
    name: auth?.loginUser?.user?.name || "Unknown",
    email: auth?.loginUser?.user?.email || "unknown@example.com",
  };

  return (
    <AnalyticsView
      stats={stats}
      weeklyTrafficData={weeklyTrafficData}
      userGrowthData={userGrowthData}
      trafficSources={trafficSources}
      userData={userData}
      onSearch={handleSearch}
      notificationCount={3} // Mock value, replace with actual
      toggleSidebar={() => {}}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.post,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      initializeAnalyticsSocket: () => ({ type: "INITIALIZE_ANALYTICS_SOCKET" }), // Mock action
      cleanupAnalyticsSocket: () => ({ type: "CLEANUP_ANALYTICS_SOCKET" }), // Mock action
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsContainer);