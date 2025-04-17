import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import PostPage from "./postView";
import {
  getPostBySlug /*, getRelatedPosts */,
} from "../../../../store/post/postActions";

class PostPageContainer extends Component {
  componentDidMount() {
    const { slug } = this.props.params;
    this.props.getPostBySlug(slug);
    // Commented out as per request
    // this.props.getRelatedPosts(slug, 3);
  }

  render() {
    const { post, /* relatedPosts, */ loading, error } = this.props;

    return (
      <PostPage
        post={post || null}
        // relatedPosts={relatedPosts || { data: [] }}
        loading={loading}
        error={error}
      />
    );
  }
}

const PostPageContainerWithParams = (props) => {
  const params = useParams();
  return <PostPageContainer {...props} params={params} />;
};

const mapStateToProps = (state) => ({
  post: state.post.currentPost.data,
  // relatedPosts: state.post.relatedPosts,
  loading: state.post.loading,
  error: state.post.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPostBySlug,
      // getRelatedPosts,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPageContainerWithParams);
