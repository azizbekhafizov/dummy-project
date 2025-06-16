import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
                Azizbek
            </Link>
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                    <FaHome /> Home
                </Link>
                <Link to="/products" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                    <FaBox /> Products
                </Link>

                <Link to="/todos" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                    📝 Todos
                </Link>
                <Link to="/posts" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                    📝 Posts
                </Link>
                <Link to="/users" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                    👥 Users
                </Link>

                {user ? (
                    <>
                        <span className="flex items-center gap-1 text-green-600 font-medium">
                            <FaUser /> {user.firstName}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1 text-red-600 hover:underline"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-blue-500">
                        <FaSignInAlt /> Login
                    </Link>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
