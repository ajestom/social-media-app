// CreatePostForm.js

import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

const CreatePostForm = () => {
  const [content, setContent] = useState('');

  const handleCreatePost = async () => {
    try {
      await firebase.firestore().collection('posts').add({
        content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Write your post here"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleCreatePost}>Post</button>
    </div>
  );
};

export default CreatePostForm;
