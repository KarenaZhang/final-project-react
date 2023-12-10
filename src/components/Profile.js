import React from 'react';
import CommentPage from './CommentProfile'
import SearchRecorder from './SearchRecorder'
const Profile = ( ) => {
  let username = localStorage.getItem("userName")
  let password = localStorage.getItem("password")
  let user = {
    username:username,
    password:password
  }
  if (!username) {
    return <div>Please login to view this page.</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Password:</strong> {user.password}</p>
      <CommentPage/>
      <SearchRecorder/>
    </div>
  );
};

export default Profile;
