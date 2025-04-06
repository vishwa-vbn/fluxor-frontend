// CommentsContainer.js
import React, { Component } from "react";
import CommentsView from "./commentsView";

// import { connect } from "react-redux";
// import { fetchComments, deleteComment } from "../../redux/actions/commentActions";

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      selectedStatus: "all",
      selectedComment: null,
      isDetailOpen: false,
    };
  }

  componentDidMount() {
    // this.props.fetchComments();
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleFilterChange = (val) => {
    this.setState({ selectedStatus: val });
  };

  openCommentDetail = (comment) => {
    this.setState({ selectedComment: comment, isDetailOpen: true });
  };

  closeCommentDetail = () => {
    this.setState({ selectedComment: null, isDetailOpen: false });
  };

  // handleDelete = (commentId) => {
  //   this.props.deleteComment(commentId);
  // };

  render() {
    const { search, selectedStatus, selectedComment, isDetailOpen } = this.state;

    const dummyComments = [
      {
        id: 1,
        authorName: "Alice",
        content: "This is an awesome post!",
        postTitle: "React Hooks Tips",
        postSlug: "react-hooks-tips",
        createdAt: "2023-12-01T12:00:00Z",
        status: "approved",
      },
      {
        id: 2,
        authorName: "Bob",
        content: "I don't agree with this point.",
        postTitle: "Redux Best Practices",
        postSlug: "redux-best-practices",
        createdAt: "2023-12-05T15:30:00Z",
        status: "pending",
      },
    ];

    return (
      <CommentsView
        comments={dummyComments}
        search={search}
        selectedStatus={selectedStatus}
        onSearchChange={this.handleSearchChange}
        onFilterChange={this.handleFilterChange}
        onViewClick={this.openCommentDetail}
        selectedComment={selectedComment}
        isDetailOpen={isDetailOpen}
        onDetailClose={this.closeCommentDetail}
        // onDeleteClick={this.handleDelete}
      />
    );
  }
}

// const mapStateToProps = (state) => ({
//   comments: state.comments.data,
//   loading: state.comments.loading,
// });

// export default connect(mapStateToProps, { fetchComments, deleteComment })(CommentsContainer);

export default CommentsContainer;
