import { useState } from "react";
import { Search, Home, Zap, Bell, Mail } from 'lucide-react';
import { NavLink, useNavigate } from "react-router-dom";

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

  const headerOptions = [
    {
      label: "Home",
      icon: <Home size={20} />,
      link: "/profile/me"
    },
    {
      label: "Moments",
      icon: <Zap size={20} />,
      link: "/moments"
    },
    {
      label: "Notifications",
      icon: <Bell size={20} />,
      link: "/notifications"
    },
    {
      label: "Messages",
      icon: <Mail size={20} />,
      link: "/messages"
    }
  ]

  return (
    <nav className="not-prose bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="text-2xl">⭐</div>
          <div className="flex space-x-6">
            {headerOptions.map((option) => (
              <NavLink key={option.label} to={option.link} className="flex items-center gap-2 !no-underline !text-gray-600 visited:text-gray-600 hover:text-gray-800">
                {option.icon}
                <span>{option.label}</span>
              </NavLink>
            ))}
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
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full font-semibold rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}