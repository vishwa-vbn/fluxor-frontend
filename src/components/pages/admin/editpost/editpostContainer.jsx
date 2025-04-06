// pages/CreatePostContainer.jsx

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditPost from "./editpost";

// import {
//   createPost,
//   uploadImage,
//   fetchTags,
//   fetchCategories,
// } from "../../store/post/postActions";

class EditPostContainer extends Component {
  state = {
    dummyTags: [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "React" },
      { id: 3, name: "Web Dev" },
    ],
    dummyCategories: [
      { id: 1, name: "Frontend" },
      { id: 2, name: "Backend" },
      { id: 3, name: "DevOps" },
    ],
  };

  handleCreatePost = (postData) => {
    // if (this.props.createPost) {
    // //   this.props.createPost(postData);
    // } else {
    //   console.log("Mock create post:", postData);
    //   alert("Post created successfully (mock)");
    // }
  };

  handleImageUpload = (file) => {
    // if (this.props.uploadImage) {
    // //   return this.props.uploadImage(file);
    // } else {
    //   console.log("Mock upload image:", file);
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("https://via.placeholder.com/600x400?text=Uploaded+Image");
    //     }, 1000);
    //   });
    // }
  };

  componentDidMount() {
    // if (this.props.fetchTags) this.props.fetchTags();
    // if (this.props.fetchCategories) this.props.fetchCategories();
  }

  render() {
    const {
      creating,
      tags,
      categories,
      error,
    } = this.props;

    // Fallback to dummy if Redux props are undefined
    const safeTags = tags && tags.length ? tags : this.state.dummyTags;
    const safeCategories =
      categories && categories.length ? categories : this.state.dummyCategories;

    return (
      <EditPost
        onCreatePost={this.handleCreatePost}
        onUploadImage={this.handleImageUpload}
        tags={safeTags}
        categories={safeCategories}
        loading={creating}
        error={error}
      />
    );
  }
}

const mapStateToProps = (state) => ({
//   creating: state?.post?.creating,
//   tags: state?.post?.tags,
//   categories: state?.post?.categories,
//   error: state?.post?.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   createPost,
    //   uploadImage,
    //   fetchTags,
    //   fetchCategories,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EditPostContainer);
