import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data.user);
      } catch (error) {
        alert("Please login first.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl font-semibold">
            Loading Profile...
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold mb-8">
            My Profile
          </h1>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500">Full Name</p>
              <h2 className="text-2xl font-semibold">
                {user.name}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Username</p>
              <h2 className="text-xl">
                @{user.username}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <h2 className="text-xl">
                {user.email}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">Member Since</p>
              <h2 className="text-xl">
                {new Date(user.createdAt).toLocaleDateString()}
              </h2>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Logout
          </button>

        </div>

      </div>
    </>
  );
};

export default Profile;