// PostContainer.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Post from "./postsView";
import { getAllPosts, getPublishedPosts, deletePost } from "../../../../store/post/postActions"; // Adjust path

class PostContainer extends Component {
  componentDidMount() {
    // Fetch all posts when component mounts
    this.props.getAllPosts();
    // Or if you only want published posts:
    // this.props.getPublishedPosts();
  }

  render() {
    const { posts, loading } = this.props;

    return (
      <Post
        posts={posts || []}
        loading={loading}
        deletePost={this.props.deletePost} // Pass delete action to Post component
      />
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post?.posts?.data, // Adjust based on your reducer structure
  loading: state.posts?.loading || false, // Adjust based on your reducer structure
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllPosts,
      getPublishedPosts,
      deletePost,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);