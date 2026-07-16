import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          🚀 ProjectSphere
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-lg">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          {token && (
            <>
              <Link
                to="/create-project"
                className="hover:text-blue-600 transition"
              >
                Create Project
              </Link>

              <Link
                to="/profile"
                className="hover:text-blue-600 transition"
              >
                Profile
              </Link>
            </>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;