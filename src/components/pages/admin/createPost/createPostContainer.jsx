// pages/CreatePostContainer.jsx

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreatePost from "./createPost";
import { createPost } from "../../../../store/post/postActions";

class CreatePostContainer extends Component {
 

  handleCreatePost = (postData) => {
    console.log("Dispatching createPost with:", postData);
    this.props.createPost(postData);
  };

  handleImageUpload = (file) => {
    // Optional: handle image upload here
  };

  render() {
   

    return (
      <CreatePost
        onCreatePost={this.handleCreatePost}
        onUploadImage={this.handleImageUpload}
        tags={this.props.tags}
        categories={this.props.categories}
        // loading={creating}
        // error={error}
      />
    );
  }
}

const mapStateToProps = (state) => ({
 
  post:state.post?.post,
  tags: state.tags?.tags || [],
  categories: state.categories?.categories?.data || [],
});


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createPost,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostContainer);
