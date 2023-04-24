// Post.js

import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      <h3>{post.content}</h3>
      <p>Posted by: {post.author}</p>
      <p>Posted at: {post.createdAt.toDate().toLocaleString()}</p>
    </div>
  );
};

export default Post;
