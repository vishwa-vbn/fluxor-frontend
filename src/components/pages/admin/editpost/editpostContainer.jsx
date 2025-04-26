import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditPost from "./editpost";
import { updatePost, getPostBySlug } from "../../../../store/post/postActions";

class EditPostContainer extends Component {
  handleUpdatePost = (postId, postData) => {
    this.props.updatePost(postId, postData);
  };

  handleFetchPost = (slug) => {
    this.props.getPostBySlug(slug);
  };

  componentDidMount() {
    // No need to fetch here since useEffect in EditPost handles it
  }

  render() {
    const { tags, categories, post, loading, error } = this.props;

    const safeTags = Array.isArray(tags) ? tags : [];
    const safeCategories = Array.isArray(categories?.data)
      ? categories.data
      : [];

    return (
      <EditPost
        onUpdatePost={this.handleUpdatePost}
        onFetchPost={this.handleFetchPost}
        tags={safeTags}
        categories={safeCategories}
        post={post} // Pass the fetched post data
        loading={loading}
        error={error}
      />
    );
  }
}

const mapStateToProps = (state) => (
  {
    tags: state.tags?.tags || [], // Assuming there's a tags reducer
    categories: state.category?.categories || {},
    post: state.post?.currentPost || {}, // Assuming singlePost holds the fetched post
    loading: state.post?.loading || false,
    error: state.post?.error || null,
  }
);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updatePost,
      getPostBySlug,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditPostContainer);
