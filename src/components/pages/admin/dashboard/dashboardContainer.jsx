import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardView from "./DashboardView";
import {
  getDashboardStats,
  getWeeklyTrafficData,
  getPostStatusData,
  getUserGrowthData,
  getQuickStats,
} from "../../../../utils/index";
import { getAllCategories } from "../../../../store/categories/categoriesAction";
import { getAllPosts } from "../../../../store/post/postActions";
import { getAllTags } from "../../../../store/tags/tagsActions";
import { fetchAllUsers } from "../../../../store/auth/authActions";
import { getPublishedPosts } from "../../../../store/post/postActions";

export class DashboardContainer extends Component {
  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllPosts();
    this.props.getAllTags();
    this.props.fetchAllUsers();
    this.props.getPublishedPosts();
  }

  render() {
    const { userData } = this.props;

    const stats = getDashboardStats();
    const barData = getWeeklyTrafficData();
    const doughnutData = getPostStatusData();
    const lineData = getUserGrowthData();
    const quickStats = getQuickStats();

    return (
      <DashboardView
        stats={stats}
        barData={barData}
        doughnutData={doughnutData}
        lineData={lineData}
        quickStats={quickStats}
        userData={userData}
        handleSearch={this.handleSearch}
      />
    );
  }

  handleSearch = (query) => {
    console.log("Searching for:", query);
  };
}

const mapStateToProps = (state) => ({
  userData: {
    name: state.auth?.loginUser?.user?.name || "Unknown",
    email: state.auth?.loginUser?.user?.email || "unknown@example.com",
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllCategories,
      getAllPosts,
      getAllTags,
      fetchAllUsers,
      getPublishedPosts,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);