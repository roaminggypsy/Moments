import {Avatar, Card, Icon, Input, List, Button, notification} from 'antd';
import React, { useState, useRef } from 'react';
import {likePost, unlikePost, createComment, createPost} from '../../util/ApiUtil';
import './postlist.css';

export default function Post(props) {
  const [isLiked, setIsLiked] = useState(props.item.likedByCurrUser);
  const commentRef = useRef(null);
  const likes = props.item.likerIds.length;
  const {caption, username} = props.item;

  function changeLike(postId) {
    setIsLiked(!isLiked);
    if (!isLiked) {
      likePost(postId);
    } else {
      unlikePost(postId);
    }
  }

  function publishComment() {
    console.log(commentRef.current.state.value);

    const createCommentRequest = {
      comment: commentRef.current.state.value
    };

    createComment(props.item.id, createCommentRequest)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

  }

  console.log(props);

  return (
    <List.Item className='post-list-item '>
      <Card bodyStyle={{ padding: 0 }} className='post-card'>
        <div className='post-user-container'>
          <Avatar
            src={props.item.userProfilePic}
            className='post-user-avatar-circle'
          />
          <span className='post-username'>{props.item.username}</span>
        </div>
        <div>
          <img alt='postId' className='post-img' src={props.item.imageUrl} />
        </div>
        <div>
          <b>{username}</b>{" "}{caption}
        </div>
        <div className='post-actions'>
          {isLiked ? (
            <Icon
              type='heart'
              theme='filled'
              onClick={() => changeLike(props.item.id)}
            />
          ) : (
            <Icon type='heart' onClick={() => changeLike(props.item.id)} />
          )}
          {likes === 0 ? '' : likes + ' likes'}
          {/*<Icon type='message' />*/}
          {/*<Icon type='upload' />*/}
          {/*<Icon type='book' className='post-action-book' />*/}
        </div>
        <div className='comment-input-container'>
          <Input className='comment-input' placeholder='Add comment' ref={commentRef} />
          <Button type="primary" shape="round" size="large" onClick={publishComment}>
            Post
          </Button>
        </div>
      </Card>
    </List.Item>
  );
}
