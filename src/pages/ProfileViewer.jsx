import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Header from "../components/ProfileComponents/HeaderComponent";
import Post from "../components/ProfileComponents/PostsComponent";
import NavigateBar from "../components/ProfileComponents/NavigateBarComponent";
import { getUserInfo, getPosts } from "../services/api";
import useUserStore from "../../store/UserInfo";

export default function ProfileViewer(){
  
  const {user, getInfo} = useUserStore()
  
  const {username} = useParams()
  const [currUser, setUser] = useState(null)
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    async function getProfile() {
      try {
        const request = await getUserInfo(username);
        
        if(!user) {
          getInfo()
        }
        setUser({
          username: request.username,
          name: request.name,
          lastname: request.lastname,
          avatar_url: request.avatar_url,
          bio: request.bio,
          background: request.background,
        });
        console.table(request)
      }
      catch (err) {
        console.error(err)
      }
    }

    getProfile()
  }, [user, getInfo]);
  
  
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigateBar user={user}/>
      <Header user={currUser}/>
      <Post user={currUser} posts={posts}/>
    </div >
  );
}