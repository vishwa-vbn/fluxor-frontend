// pages/CreatePostContainer.jsx

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreatePost from "./createPost";
import { createPost } from "../../../../store/post/postActions";

class CreatePostContainer extends Component {
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

    
  };

  handleImageUpload = (file) => {};

  componentDidMount() {}

  render() {
    const { creating, tags, categories, error } = this.props;

    // Fallback to dummy if Redux props are undefined
    const safeTags = tags && tags.length ? tags : this.state.dummyTags;
    const safeCategories =
      categories && categories.length ? categories : this.state.dummyCategories;

    return (
      <CreatePost
        onCreatePost={this.handleCreatePost}
        onUploadImage={this.handleImageUpload}
        tags={safeTags}
        createPost={this.props.createPost}
        categories={safeCategories}
        loading={creating}
        error={error}
      />
    );
  }
}

const mapStateToProps = (state) => (
  console.log("redux state in create post", state.post),
  {});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createPost,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostContainer);
