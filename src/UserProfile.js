// UserProfile.js

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

const UserProfile = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(doc => {
        setUserProfile(doc.data());
      });

    return () => unsubscribe();
  }, [userId]);

  if (!userProfile) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Joined: {userProfile.createdAt.toDate().toLocaleString()}</p>
    </div>
  );
};

export default UserProfile;
