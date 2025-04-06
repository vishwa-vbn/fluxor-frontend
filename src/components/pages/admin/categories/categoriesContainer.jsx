// CategoriesContainer.jsx
import React, { Component } from 'react';
import CategoriesView from './categoriesView';

const mockCategories = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'Posts related to tech',
    parentId: null,
    postCount: 5,
    featuredImage: '',
  },
  {
    id: 2,
    name: 'Programming',
    slug: 'programming',
    description: 'All about coding',
    parentId: 1,
    postCount: 3,
    featuredImage: '',
  },
  {
    id: 3,
    name: 'Design',
    slug: 'design',
    description: '',
    parentId: null,
    postCount: 2,
    featuredImage: '',
  },
];

class CategoriesContainer extends Component {
  state = {
    categories: mockCategories,
    search: '',
    isAddOpen: false,
    isEditOpen: false,
    selectedCategory: null,
    loading: false,
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  openAddModal = () => this.setState({ isAddOpen: true });
  closeAddModal = () => this.setState({ isAddOpen: false });

  openEditModal = (category) => this.setState({ selectedCategory: category, isEditOpen: true });
  closeEditModal = () => this.setState({ selectedCategory: null, isEditOpen: false });

  handleAddCategory = (data) => {
    const newCategory = {
      ...data,
      id: Date.now(),
      postCount: 0,
    };
    this.setState((prevState) => ({
      categories: [...prevState.categories, newCategory],
      isAddOpen: false,
    }));
  };

  handleEditCategory = (data) => {
    const { selectedCategory, categories } = this.state;
    if (!selectedCategory) return;

    const updated = categories.map((cat) =>
      cat.id === selectedCategory.id ? { ...cat, ...data } : cat
    );
    this.setState({ categories: updated, isEditOpen: false, selectedCategory: null });
  };

  handleDeleteCategory = (id) => {
    this.setState((prevState) => ({
      categories: prevState.categories.filter((cat) => cat.id !== id),
    }));
  };

  getFilteredCategories = () => {
    const { search, categories } = this.state;
    if (!search) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.slug.toLowerCase().includes(search.toLowerCase())
    );
  };

  render() {
    const { categories, search, isAddOpen, isEditOpen, selectedCategory, loading } = this.state;

    return (
      <CategoriesView
        categories={this.getFilteredCategories()}
        allCategories={categories}
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

export default CategoriesContainer;
