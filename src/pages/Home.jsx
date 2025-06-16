import { Link } from "react-router-dom";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 mt-40 text-center rounded-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">web site ga xush kelibsiz </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          dummy json api bilan qurulgan web site  
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

    </div>
  );
};

export default Home;
