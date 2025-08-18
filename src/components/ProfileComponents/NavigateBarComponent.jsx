import { useState } from "react";
import { Search, Home, Zap, Bell, Mail } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function NavigateBar({user}) {
  const [Query, SetQuery] = useState("")
  const navigator = useNavigate()

  async function SearchUser() {
    navigator(`/profile/${Query}`)
  }

  async function logout(){
    localStorage.removeItem('token')
    navigator("/")
  }

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-gray-700 font-bold text-xl">⭐</div>
          <div className="flex space-x-6">
            <a href="/profile/me" className="flex items-center space-x-2 text-gray-700">
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
              placeholder="Search User"
              value={Query}
              onChange={(e) => SetQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  SearchUser();
                }
              }}
              className="bg-gray-100 pl-10 pr-4 py-2 rounded-full border-none outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={`Avatar de ${user?.username}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-medium text-sm">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}