import React, { useState, useEffect } from 'react';
import Header from '../components/ProfileComponents/HeaderComponent';
import NavigateBar from '../components/ProfileComponents/NavigateBarComponent';
import Post from '../components/ProfileComponents/PostsComponent';
import useUserStore from '../../store/UserInfo';

const Profile = () => {
  const { user, getInfo, loading, error, getUserPosts, posts } = useUserStore()

  useEffect(() => {
    async function getProfile() {
      try {
        if(!user){
          getInfo()
          console.log("A")
        }

        if(!posts){
          getUserPosts()
          console.log("E")
        }

        console.table(user)
        console.table(posts)
      }
      catch (err) {
        console.error(err)
      }
    }

    getProfile()
  }, [user, getInfo, posts, getUserPosts]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigateBar user={user} />
      <Header user={user} />
      <Post user={user} posts={posts} />
    </div >
  );
};

export default Profile;