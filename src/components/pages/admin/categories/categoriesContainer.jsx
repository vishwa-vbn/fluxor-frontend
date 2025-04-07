import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../../../store/category/categoryActions';
import CategoriesView from './categoriesView';

class CategoriesContainer extends Component {
  state = {
    search: '',
    isAddOpen: false,
    isEditOpen: false,
    selectedCategory: null,
  };

  componentDidMount() {
    this.props.getAllCategories();
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  openAddModal = () => this.setState({ isAddOpen: true });
  closeAddModal = () => this.setState({ isAddOpen: false });

  openEditModal = (category) =>
    this.setState({ selectedCategory: category, isEditOpen: true });
  closeEditModal = () =>
    this.setState({ selectedCategory: null, isEditOpen: false });

  handleAddCategory = (data) => {
    this.props.createCategory(data).then(() => {
      this.closeAddModal();
    });
  };

  handleEditCategory = (data) => {
    const { selectedCategory } = this.state;
    if (!selectedCategory) return;

    this.props.updateCategory(selectedCategory.id, data).then(() => {
      this.closeEditModal();
    });
  };

  handleDeleteCategory = (id) => {
    this.props.deleteCategory(id);
  };

  getFilteredCategories = () => {
    const { search } = this.state;
    const { categories } = this.props;

    if (!search) return categories;

    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.slug.toLowerCase().includes(search.toLowerCase())
    );
  };

  render() {
    const { isAddOpen, isEditOpen, selectedCategory, search } = this.state;
    const { categories, loading } = this.props;

    return (
      <CategoriesView
        categories={this.getFilteredCategories()}
        allCategories={categories||[]}
        isLoading={loading}
        search={search}
        onSearchChange={this.handleSearchChange}
        onAddClick={this.openAddModal}
        onEditClick={this.openEditModal}
        onDeleteClick={this.handleDeleteCategory}
        isAddOpen={isAddOpen}
        isEditOpen={isEditOpen}
        onAddSubmit={this.handleAddCategory}
        onEditSubmit={this.handleEditCategory}
        onAddClose={this.closeAddModal}
        onEditClose={this.closeEditModal}
        selectedCategory={selectedCategory}
      />
    );
  }
}

const mapStateToProps = (state) => (
  console.log("redux", state),
  {
  categories: state.categories.categories.data,
  loading: state.categories.loading,
  error: state.categories.error,
});

const mapDispatchToProps = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);
