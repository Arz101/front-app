import Header from "../src/components/ProfileComponents/HeaderComponent";
import NavigateBar from "../src/components/ProfileComponents/NavigateBarComponent";
import Post from "../src/components/ProfileComponents/PostsComponent";

export default function Playground() {
  const testUser = {
    name: "Name", 
    lastname: "Lastname",
    username: "username",
    avatar_url: "https://ihpscbjeznkqqlzcuztt.supabase.co/storage/v1/object/sign/App-Bucket/avt/83872f81-0e84-4c3f-afbc-a338fb7818d6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81OGYwNWQzYy1hMTRmLTRhN2QtYmJlOS02MzczOGFlNGEwNGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBcHAtQnVja2V0L2F2dC84Mzg3MmY4MS0wZTg0LTRjM2YtYWZiYy1hMzM4ZmI3ODE4ZDYuanBnIiwiaWF0IjoxNzU1NTM1NDY5LCJleHAiOjE3ODcwNzE0Njl9.CSV90G5mecT5n5xHCUMS__QgokfpX31oXXnyDGpU0_s",
    bio: "No bio yett ☕",
    background: "https://ihpscbjeznkqqlzcuztt.supabase.co/storage/v1/object/sign/App-Bucket/backgrounds/428e2f09-68be-4c65-843b-81eb1f818fbc.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81OGYwNWQzYy1hMTRmLTRhN2QtYmJlOS02MzczOGFlNGEwNGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBcHAtQnVja2V0L2JhY2tncm91bmRzLzQyOGUyZjA5LTY4YmUtNGM2NS04NDNiLTgxZWIxZjgxOGZiYy53ZWJwIiwiaWF0IjoxNzU1NTM1NDE5LCJleHAiOjE3ODcwNzE0MTl9.mNuQ29poX3gS3oc8EgocXxwI1HJsW45eLVYpb_BNxrU"
  }
  
  const testPost = [{
    id: 1,
    description: "Hello World",
    picture: "https://ihpscbjeznkqqlzcuztt.supabase.co/storage/v1/object/sign/App-Bucket/img/91acccc9-46a9-4fe9-b4f3-482090ebe30c.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81OGYwNWQzYy1hMTRmLTRhN2QtYmJlOS02MzczOGFlNGEwNGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBcHAtQnVja2V0L2ltZy85MWFjY2NjOS00NmE5LTRmZTktYjRmMy00ODIwOTBlYmUzMGMucG5nIiwiaWF0IjoxNzU1NTM1NTQxLCJleHAiOjE3ODcwNzE1NDF9.-D--pmRuawEdb66O5KwK0mjpaUawp1UIK19wUyF2dYo",
    datecreated: '2025-08-03T10:33:40.788137'	,
    comments: 6,
    comments_details: null
  }]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative">
        <NavigateBar user = {testUser}></NavigateBar>
        <Header user = {testUser}></Header>
      </div>

      <Post
        posts={testPost}
        user={testUser}
      />
    </div>
  );
}