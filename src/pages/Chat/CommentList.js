import React, { Component } from "react";
import autoscroll from "autoscroll-react";
import { Comment, List } from "antd";

// import { Container } from './styles';

class CommentList extends Component {
  render() {
    return (
      <div
        id="scrollbar"
        style={{ maxHeight: this.props.minHeight, overflowY: "scroll" }}
      >
        {this.props.comments.length > 0 && (
          <List
            dataSource={this.props.comments}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
          />
        )}
      </div>
    );
  }
}

export default autoscroll(CommentList, { isScrolledDownThreshold: 100 });
