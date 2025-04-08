import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreatePost from "./createPost";
import { createPost } from "../../../../store/post/postActions";

class CreatePostContainer extends Component {
  handleCreatePost = (postData) => {
    this.props.createPost(postData);
  };

  handleImageUpload = (file) => {
    // Implement image upload logic if needed
    // This could dispatch an action to upload the image and return a URL
  };

  componentDidMount() {
    // If you need to fetch tags or categories on mount, dispatch actions here
    // e.g., this.props.getAllCategories();
  }

  render() {
    const { tags, categories, loading, error } = this.props;

    // Ensure safe data for rendering
    const safeTags = Array.isArray(tags) ? tags : [];
    const safeCategories = Array.isArray(categories?.data) ? categories.data : [];

    return (
      <CreatePost
        onCreatePost={this.handleCreatePost}
        onUploadImage={this.handleImageUpload}
        tags={safeTags}
        createPost={this.props.createPost}
        categories={safeCategories}
        loading={loading}
        error={error}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags?.tags || [], // Assuming there's a tags reducer
  categories: state.category?.categories || {},
  loading: state.post?.loading || false,
  error: state.post?.error || null,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createPost,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostContainer);