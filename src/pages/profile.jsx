import React, { useState, useEffect } from 'react';
import Header from '../components/ProfileComponents/HeaderComponent';
import NavigateBar from '../components/ProfileComponents/NavigateBarComponent';
import Post from '../components/ProfileComponents/PostsComponent';
import { getUserInfo, getPosts } from "../services/api";
import useUserStore from '../../store/UserInfo';

const Profile = () => {
  const { user, getInfo, loading, error } = useUserStore()
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getProfile() {
      try {
        if(!user){
          getInfo()
        }
        console.log(user)
        const posts_request = await getPosts();
        setPosts(posts_request)
      }
      catch (err) {
        console.error(err)
      }
    }

    getProfile()
  }, [user, getInfo]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigateBar user={user} />
      <Header user={user} />
      <Post user={user} posts={posts} />
    </div >
  );
};

export default Profile;