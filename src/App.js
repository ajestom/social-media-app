// App.js

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import NewsFeed from './NewsFeed';
import CreatePostForm from './CreatePostForm';
import UserProfile from './UserProfile';

// Initialize Firebase
// Replace with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWBAjg7wGf9dZHZp2JNS6uRVsNFH_AwbQ",
  authDomain: "social-media2023.firebaseapp.com",
  projectId: "social-media2023",
  storageBucket: "social-media2023.appspot.com",
  messagingSenderId: "234845223174",
  appId: "1:234845223174:web:c47734a56656333b60c687",
  measurementId: "G-SX80P0GQRF"
};
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <button onClick={handleLogout}>Logout</button>
          {/* Render the main content of your app here */}
          <NewsFeed />
          <CreatePostForm />
          {/* Render user profile based on logged-in user */}
          <UserProfile userId={user.uid} />
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <LoginForm />
          <h1>Sign up</h1>
          <SignupForm />
        </div>
      )}
    </div>
  );
};

export default App;
