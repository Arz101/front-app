import Header from "../src/components/ProfileComponents/HeaderComponent";
import NavigateBar from "../src/components/ProfileComponents/NavigateBarComponent";
import Post from "../src/components/ProfileComponents/PostsComponent";

export default function Playground() {
  const testUser = {
    name: "Adrian Rodriguez",
    username: "arz101",
    avatar: null,
    bio: "No bio yett ☕",
    background: "https://ihpscbjeznkqqlzcuztt.supabase.co/storage/v1/object/sign/App-Bucket/backgrounds/428e2f09-68be-4c65-843b-81eb1f818fbc.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81OGYwNWQzYy1hMTRmLTRhN2QtYmJlOS02MzczOGFlNGEwNGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBcHAtQnVja2V0L2JhY2tncm91bmRzLzQyOGUyZjA5LTY4YmUtNGM2NS04NDNiLTgxZWIxZjgxOGZiYy53ZWJwIiwiaWF0IjoxNzU1NDA4NDk1LCJleHAiOjE3NTU0OTQ4OTV9.tbr83bEvFsdSWDG4BLJBBys_Dco3Ca7MZRir-Ef_RxI"

  }
  
  const testPost = [{
    id: 1,
    description: "Hello World",
    picture: "https://ihpscbjeznkqqlzcuztt.supabase.co/storage/v1/object/sign/App-Bucket/img/91acccc9-46a9-4fe9-b4f3-482090ebe30c.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81OGYwNWQzYy1hMTRmLTRhN2QtYmJlOS02MzczOGFlNGEwNGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBcHAtQnVja2V0L2ltZy85MWFjY2NjOS00NmE5LTRmZTktYjRmMy00ODIwOTBlYmUzMGMucG5nIiwiaWF0IjoxNzU1NDEwMzAwLCJleHAiOjE3NTU0OTY3MDB9.YTd0gQ7-KNpwhdsoh9y3pmxWyJdEMfluSceyGvnTvTs",
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