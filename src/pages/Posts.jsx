import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=12")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded p-4 flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-600 line-clamp-1">
                {post.title}
              </h2>
              <p className="text-sm text-gray-700 line-clamp-4 mb-3">
                {post.body}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
