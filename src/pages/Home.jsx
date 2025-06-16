import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to SmartHub</h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          All-in-one demo dashboard with dummy data from DummyJSON API. Products, Todos, Posts, Users and more.
        </p>
        {!user && (
          <Link
            to="/login"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded hover:bg-gray-200"
          >
            Login to Explore
          </Link>
        )}
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Products", text: "Browse and view products with images and descriptions.", link: "/products" },
            { title: "Todos", text: "Manage your personal todos: add, complete, filter, and delete.", link: "/todos" },
            { title: "Users", text: "View list of all users from the dummy API.", link: "/users" },
            { title: "Posts", text: "Explore posts and user-generated content.", link: "/posts" },
            { title: "Comments", text: "See comments related to posts.", link: "/comments" },
            { title: "Carts", text: "View cart details with total prices (optional).", link: "/carts" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="bg-white p-6 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
