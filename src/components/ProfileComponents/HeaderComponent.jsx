import { Calendar, MapPin, Link, Camera } from 'lucide-react';
import { useState } from 'react';

export default function Header({ user }) {
  const [activeTab, setActiveTab] = useState('Posts');

  return (
    <div className="">
      {/* Header con imagen de fondo */}
      <div
        className="h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${user?.background})`
        }}
      ></div>
      <div className="max-w-4xl mx-auto px-4 relative -mt-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white flex items-center justify-center overflow-hidden">
                    { user?.avatar_url ? (
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
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">{user?.name + " " + user?.lastname} </h1>
                  </div>
                  <p className="text-gray-600">@{user?.username}</p>
                  <p className="text-gray-800 mt-2">{user?.bio}</p>

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
            </div>
            <div className="flex space-x-6 mt-4">
              <button className="bg-gray-700 text-white px-6 py-2 rounded-full w-full">
                posts to {user?.name}
              </button>
              <button className="border border-gray-700 text-gray-700 px-6 py-2 rounded-full w-full hover:bg-blue-50">
                Message to {user?.name}
              </button>
            </div>
            <div className="flex justify-around border-b mt-6">
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

  )
}