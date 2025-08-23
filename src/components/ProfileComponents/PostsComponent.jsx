import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
} from "lucide-react";
import Create from "./PostsCreate";

export default function Post({ posts, user }) {
  const [showComments, SetCom] = useState(null);
  const [newComment, SetNewComment] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Ahora";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const Handle = (id) => {
    console.log(showComments);
    SetCom(showComments === id ? null : id);
  };

  async function handleComment() {
    SetNewComment("");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mt-6">
      <Create/>
      <div className="flex space-x-6">
        <div className="flex-1">
          {posts &&
            posts.map((posts) => (
              <div
                key={posts.id}
                className="bg-white rounded-lg shadow mb-4 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
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
                      <h6 className="font-bold">{posts.username}</h6>
                      {posts.verified && (
                        <div className="w-4 h-4 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs">
                          ✓
                        </div>
                      )}
                      <span className="text-gray-600">@{user?.username}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-400">
                        {formatDate(posts.datecreated)}
                      </span>
                      <div className="ml-auto">
                        <MoreHorizontal
                          size={16}
                          className="text-gray-400 cursor-pointer hover:text-gray-600"
                        />
                      </div>
                    </div>

                    {posts.replyTo && (
                      <p className="text-gray-600 text-sm mt-1">
                        Replying to{" "}
                        <span className="text-gray-700">{posts.replyTo}</span>
                      </p>
                    )}

                    <p className="my-2 text-gray-800 leading-relaxed">
                      {posts.description}
                    </p>

                    <div className="flex justify-center items-center rounded">
                      {posts.picture && (
                        <img src={posts.picture} className="rounded" />
                      )}
                    </div>

                    <div className="flex items-center gap-5 mt-4 text-gray-500">
                      <button
                        className="flex items-center gap-1 hover:text-emerald-500"
                        onClick={() => Handle(posts.id)}
                      >
                        <div className="rounded-full group-hover:bg-blue-50">
                          <MessageCircle size={16} />
                        </div>
                        <span className="text-sm">{posts.comments}</span>
                      </button>

                      <button className="flex items-center space-x-2 hover:text-green-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-green-50">
                          <Repeat2 size={16} />
                        </div>
                        {posts.reposts > 0 && (
                          <span className="text-sm">{posts.reposts}</span>
                        )}
                      </button>
                      <button className="flex items-center space-x-2 hover:text-red-500 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-red-50">
                          <Heart size={16} />
                        </div>
                        {posts.likes > 0 && (
                          <span className="text-sm">{posts.likes}</span>
                        )}
                      </button>
                      <button className="flex items-center space-x-2 hover:text-gray-700 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50">
                          <Share size={16} />
                        </div>
                      </button>
                    </div>

                    {showComments === posts.id &&
                      posts.comments_details?.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 group mt-3"
                        >
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
                                    {comment.username?.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">
                                  @{comment.username}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {formatDate(comment.dateCreated)}
                                </span>
                                <div className="ml-auto">
                                  <MoreHorizontal
                                    size={16}
                                    className="text-gray-400 cursor-pointer hover:text-gray-600"
                                  />
                                </div>
                              </div>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    {showComments === posts.id && (
                      <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 group mt-3">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-xs">
                              Tú
                            </span>
                          </div>
                          <div className="flex-1">
                            <textarea
                              placeholder="Escribe un comentario..."
                              onChange={(e) => SetNewComment(e.target.value)}
                              className="w-full !resize-none p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              rows="2"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-400">
                                Máximo 500 caracteres
                              </span>
                              <button
                                className="bg-gray-500 rounded hover:bg-gray-600 text-white px-4 py-1.5  text-sm font-medium transition-colors"
                                onClick={handleComment}
                              >
                                Comentar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
              New features and a new look are launching soon. Bookmarks, account
              switching, dark mode, and so much more — before long, you'll be
              able to see what's happening even faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
