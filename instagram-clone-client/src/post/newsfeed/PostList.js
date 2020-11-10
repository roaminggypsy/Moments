import React, { Component } from 'react';
import { List } from 'antd';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroller';
import { getFeed } from '../../util/ApiUtil';
import LoadingIndicator from '../../common/LoadingIndicator';
import './postlist.css';

class PostList extends Component {
  state = {
    currentUser: { ...this.props.currentUser },
    pagingState: null,
    hasMore: false,
    loading: false,
    feed: [],
  };

  componentDidMount = () => {
    this.loadUserFeed();
  };

  loadUserFeed = () => {
    getFeed(this.state.currentUser.username, this.state.pagingState)
      .then((res) => {
        console.log(res);
        this.setState({
          hasMore: !res.last,
          feed: res.content,
          pagingState: res.pagingState,
        });
      })
      .catch((error) => {
        console.log('error: ' + error);
      });
  };

  handleInfiniteOnLoad = () => {
    this.setState({
      loading: true,
    });

    let feed = this.state.feed;

    getFeed(this.state.currentUser.username, this.state.pagingState)
      .then((res) => {
        feed = feed.concat(res.content);

        this.setState({
          feed,
          hasMore: !res.last,
          pagingState: res.pagingState,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          hasMore: false,
          loading: false,
        });
      });
  };

  getPostRender = (item) => {
    return <Post item={item} />;
  };

  render() {
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
        loader={<LoadingIndicator />}
      >
        <List
          dataSource={this.state.feed}
          renderItem={(item) => this.getPostRender(item)}
          split={false}
        />
      </InfiniteScroll>
    );
  }
}

export default PostList;
