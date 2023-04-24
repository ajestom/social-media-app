// NewsFeed.js

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import Post from './Post';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const newPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(newPosts);
      });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>News Feed</h2>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default NewsFeed;
