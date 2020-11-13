import { Avatar, Card, Icon, Input, List } from 'antd';
import React, { useState } from 'react';
import { likePost, unlikePost } from '../../util/ApiUtil';

export default function Post(props) {
  const [isLiked, setIsLiked] = useState(props.item.likedByCurrUser);

  function changeLike(postId) {
    setIsLiked(!isLiked);
    if (!isLiked) {
      likePost(postId);
    } else {
      unlikePost(postId);
    }
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
          <Icon type='message' />
          <Icon type='upload' />
          <Icon type='book' className='post-action-book' />
        </div>
        <div className='comment-input-container'>
          <Input placeholder='Add comment' />
        </div>
      </Card>
    </List.Item>
  );
}
