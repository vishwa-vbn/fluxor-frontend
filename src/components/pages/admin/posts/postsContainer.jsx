// PostContainer.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Post from "./postsView";

class PostContainer extends Component {
  render() {
    // Dummy data for now
    const dummyPosts = [
      {
        id: 1,
        title: "React Redux Tutorial",
        author: { username: "JohnDoe", avatar: "" },
        status: "published",
        publishedAt: "2024-04-01",
        viewCount: 120,
        slug: "react-redux-tutorial"
      },
      {
        id: 2,
        title: "Understanding useEffect",
        author: { username: "JaneSmith", avatar: "" },
        status: "draft",
        publishedAt: null,
        viewCount: 87,
        slug: "understanding-useeffect"
      },
      {
        id: 3,
        title: "Deploying React Apps",
        author: { username: "DevGuy", avatar: "" },
        status: "scheduled",
        publishedAt: "2024-04-15",
        viewCount: 45,
        slug: "deploying-react-apps"
      }
    ];

    return (
      <Post
        posts={dummyPosts}
        loading={false}
        // You can add more props later like fetchPosts or deletePost
      />
    );
  }
}

const mapStateToProps = (state) => ({
  // Not using redux state yet
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // No actions wired up yet
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
