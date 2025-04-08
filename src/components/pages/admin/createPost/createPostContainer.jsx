import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreatePost from "./createPost";
import { createPost } from "../../../../store/post/postActions";

class CreatePostContainer extends Component {
  handleCreatePost = (postData) => {
    this.props.createPost(postData);
  };

  handleImageUpload = (file) => {};

  componentDidMount() {}

  render() {
    const { tags, categories, loading, error } = this.props;

    const safeTags = Array.isArray(tags) ? tags : [];
    const safeCategories = Array.isArray(categories?.data)
      ? categories.data
      : [];

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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createPost,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostContainer);
