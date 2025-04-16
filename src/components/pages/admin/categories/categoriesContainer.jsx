import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CategoriesView from "./categoriesView";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  initializeCategorySocket,
  cleanupCategorySocket,
} from "../../../../store/categories/categoriesAction";

class CategoriesContainer extends Component {
  state = {
    search: "",
  };

  componentDidMount() {
    this.props.getAllCategories();
    this.props.initializeCategorySocket();
  }

  componentWillUnmount() {
    this.props.cleanupCategorySocket();
  }

  handleCreate = (categoryData) => {
    this.props.createCategory(categoryData);
  };

  handleUpdate = (id, updatedData) => {
    this.props.updateCategory(id, updatedData);
  };

  handleDelete = (id) => {
    this.props.deleteCategory(id);
  };

  handleEditRequest = (id) => {
    this.props.getCategoryById(id);
  };

  handleSearchChange = (query) => {
    this.setState({ search: query });
  };

  render() {
    const { categories, loading, error, selectedCategory } = this.props;
    const { search } = this.state;

    return (
      <CategoriesView
        categories={categories}
        allCategories={categories}
        loading={loading}
        error={error}
        search={search}
        onSearchChange={this.handleSearchChange}
        selectedCategory={selectedCategory}
        onCreate={this.handleCreate}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        onEditRequest={this.handleEditRequest}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.category?.categories?.data || [],
  loading: state.category?.loading || false,
  error: state.category?.error || null,
  selectedCategory: state.category?.selectedCategory || null,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createCategory,
      getAllCategories,
      getCategoryById,
      updateCategory,
      deleteCategory,
      initializeCategorySocket,
      cleanupCategorySocket,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesContainer);
