import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
} from '../../../../store/tags/tagsActions';
import TagsView from './tagsView';

const TagsContainer = ({
  tags,
  loading,
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
}) => {
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  // Fetch tags on mount
  useEffect(() => {
    getAllTags();
  }, [getAllTags]);

  // Log selectedTag changes for debugging
  useEffect(() => {
    console.log("selected tag", selectedTag);
  }, [selectedTag]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Modal controls
  const openAddModal = () => setIsAddOpen(true);
  const closeAddModal = () => setIsAddOpen(false);

  const openEditModal = (tag) => {
    setSelectedTag({ ...tag }); // Create a copy to avoid mutating original
    setIsEditOpen(true);
  };
  const closeEditModal = () => {
    setSelectedTag(null);
    setIsEditOpen(false);
  };

  // Handle form submissions
  const handleAddTag = (data) => {
    const newTag = {
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'), // Auto-generate slug if not provided
      description: data.description || '',
    };
    createTag(newTag);
    closeAddModal();
  };

  const handleEditTag = (data) => {
    if (!selectedTag) return;
    const updatedTag = {
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
    };
    updateTag(selectedTag.id, updatedTag); // Use 'id' consistently
    closeEditModal();
  };

  const handleDeleteTag = (id) => {
    deleteTag(id);
  };

  // Filter tags based on search
  const getFilteredTags = () => {
    if (!tags || !Array.isArray(tags)) return [];
    if (!search) return tags;
    return tags.filter(
      (tag) =>
        tag.name?.toLowerCase().includes(search.toLowerCase()) ||
        tag.slug?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <TagsView
      tags={getFilteredTags()}
      allTags={tags}
      isLoading={loading}
      search={search}
      onSearchChange={handleSearchChange}
      onAddClick={openAddModal}
      onEditClick={openEditModal}
      onDeleteClick={handleDeleteTag}
      isAddOpen={isAddOpen}
      isEditOpen={isEditOpen}
      onAddSubmit={handleAddTag}
      onEditSubmit={handleEditTag}
      onAddClose={closeAddModal}
      onEditClose={closeEditModal}
      selectedTag={selectedTag}
    />
  );
};

const mapStateToProps = (state) => ({
  tags: state.tags?.tags || [], // Consistent with tags reducer
  loading: state.tags?.loading || false, // Fix typo: 'tag' -> 'tags'
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllTags,
      createTag,
      updateTag,
      deleteTag,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);