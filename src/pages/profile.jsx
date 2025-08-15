import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, Share, Search, Home, Zap, Bell, Mail, Bookmark, User, MoreHorizontal, Calendar, MapPin, Link, Camera, AppWindow } from 'lucide-react';
import apiClient from '../services/api';
import axios from 'axios';

const Profile = () => {

  const token = localStorage.getItem('token')
  const [name, setName] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [username, setUsername] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [bio, setBio] = useState(null)
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('Posts');
  const [showComments, SetCom] = useState(false)
  const [posts_id, SetID] = useState(null)
  const [comments, SetComments] = useState([])
  const [newComment, SetNewComment] = useState("")

  useEffect(() => {
    async function getProfile() {
      try {
        const request = await apiClient.get("/profiles/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          withCredentials: true
        });

        const posts_request = await apiClient.get("/posts/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true
          }
        })

        console.log(posts_request.data)

        setName(request.data.name)
        setLastname(request.data.lastname)
        setUsername(request.data.username)
        setAvatar(request.data.avatar_url)
        setBio(request.data.bio)
        setPosts(posts_request.data)
        SetID(request.data.id)

      }
      catch (err) {
        console.error(err)
      }
    }


    getProfile()
  }, [token]);

  function Handle() {
    console.log("jflkdf")
    SetCom(!showComments)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };


  async function handleComment() {
    try {
      await apiClient.post("posts/comments/make",
        {
          publication_id: 8,
          content: newComment
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            withCredentials: true
          }
        }
      )
    }
    catch (err){
      console.err(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header con imagen de fondo */}
      <div className="relative">
        <div
          className="h-48 bg-cover bg-center"
          style={{
            backgroundImage: 'url("http://localhost:8000/img/background.png")'
          }}
        >
          {/* Navigation Bar */}
          <nav className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-gray-700 font-bold text-xl">⭐</div>
                <div className="flex space-x-6">
                  <a href="#" className="flex items-center space-x-2 text-gray-700">
                    <Home size={20} />
                    <span>Home</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-600">
                    <Zap size={20} />
                    <span>Moments</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-600">
                    <Bell size={20} />
                    <span>Notifications</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 text-gray-600">
                    <Mail size={20} />
                    <span>Messages</span>
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Post"
                    className="bg-gray-100 pl-10 pr-4 py-2 rounded-full border-none outline-none focus:ring-2 focus:ring-gray-700"
                  />
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full">
                  <img
                    alt='avatar'
                    src={avatar}
                  />
                </div>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600">
                  posts
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Profile Section */}
        <div className="max-w-4xl mx-auto px-4 relative -mt-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center">
                      <img
                        alt='avatar'
                        src={avatar}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h1 className="text-2xl font-bold">{name + " " + lastname}</h1>
                    </div>
                    <p className="text-gray-600">@{username}</p>
                    <p className="text-gray-800 mt-2">{bio}</p>
                    <p className="text-gray-700">@App</p>

                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>Mars</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Link size={16} />
                        <span className="text-gray-700">something.co</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>Joined April 2012</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
                      <Camera size={16} />
                      <span className="text-gray-700">1 Photos and videos</span>
                    </div>
                  </div>
                </div>
                <button className="bg-gray-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600">
                  Following
                </button>
              </div>

              <div className="flex space-x-6 mt-4">
                <button className="bg-gray-700 text-white px-6 py-2 rounded-full w-full">
                  posts to {name + " " + lastname}
                </button>
                <button className="border border-gray-700 text-gray-700 px-6 py-2 rounded-full w-full hover:bg-blue-50">
                  Message to {name + " " + lastname}
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <span className="text-gray-700">0 Followers</span>
              </div>

              {/* Tabs */}
              <div className="flex space-x-8 mt-6 border-b">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`pb-3 font-semibold ${activeTab === 'posts'
                    ? 'text-gray-700 border-b-2 border-gray-700'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  posts & Replies
                </button>
                <button
                  onClick={() => setActiveTab('posts-only')}
                  className={`pb-3 font-semibold ${activeTab === 'posts-only'
                    ? 'text-gray-700 border-b-2 border-gray-700'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  posts
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={`pb-3 font-semibold ${activeTab === 'media'
                    ? 'text-gray-700 border-b-2 border-gray-700'
                    : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  Media
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex space-x-6">
          {/* posts Column */}
          <div className="flex-1">
            {posts.map((posts) => (
              <div key={posts.id} className="bg-white rounded-lg shadow mb-4 p-6 hover:shadow-md transition-shadow">
                <div className="flex space-x-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <img
                      alt='avatar'
                      src={avatar}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h6 className="font-bold">{posts.username}</h6>
                      {posts.verified && (
                        <div className="w-4 h-4 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs">✓</div>
                      )}
                      <span className="text-gray-600">@{username}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-400">{posts.datecreated}</span>
                      <div className="ml-auto">
                        <MoreHorizontal size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                      </div>
                    </div>

                    {posts.replyTo && (
                      <p className="text-gray-600 text-sm mt-1">
                        Replying to <span className="text-gray-700">{posts.replyTo}</span>
                      </p>
                    )}

                    <p className="mt-2 text-gray-800 leading-relaxed">{posts.description}</p>

                    <div className="flex justify-center items-center">
                      {posts.picture && (
                        <img
                          src={posts.picture}
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-8 mt-4 text-gray-500">
                      <button className="flex items-center space-x-2 hover:text-gray-700 transition-colors group"
                        onClick={Handle}
                      >

                        <div className="p-2 rounded-full group-hover:bg-blue-50">
                          <MessageCircle size={16} />
                        </div>
                        <span className="text-sm">{posts.comments}</span>
                      </button>


                      <button className="flex items-center space-x-2 hover:text-green-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-green-50">
                          <Repeat2 size={16} />
                        </div>
                        {posts.reposts > 0 && <span className="text-sm">{posts.reposts}</span>}
                      </button>
                      <button className="flex items-center space-x-2 hover:text-red-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-red-50">
                          <Heart size={16} />
                        </div>
                        {posts.likes > 0 && <span className="text-sm">{posts.likes}</span>}
                      </button>
                      <button className="flex items-center space-x-2 hover:text-gray-700 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50">
                          <Share size={16} />
                        </div>
                      </button>
                    </div>

                    {showComments &&
                      posts.comments_details?.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 group">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                {comment.picture ? (
                                  <img
                                    src={comment.picture}
                                    alt={`Avatar de ${comment.username}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-white font-medium text-sm">
                                    {comment.username.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">@{comment.username}</span>
                                <span className="text-gray-500 text-xs">{formatDate(comment.dateCreated)}</span>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    }

                    <div className="bg-white rounded-xl shadow-sm p-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-medium text-xs">Tú</span>
                        </div>
                        <div className="flex-1">
                          <textarea
                            placeholder="Escribe un comentario..."
                            onChange={(e) => SetNewComment(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            rows="2"
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">Máximo 500 caracteres</span>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                              onClick={handleComment}
                            >
                              Comentar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-700">📱</div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">A whole new App is coming</h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                New features and a new look are launching soon. Bookmarks, account switching, dark mode, and so much more — before long, you'll be able to see what's happening even faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;