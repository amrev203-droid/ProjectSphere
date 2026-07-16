import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    video: "",
    github: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        description: formData.description,

        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),

        images: formData.image
          ? [formData.image]
          : [],

        videos: formData.video
          ? [formData.video]
          : [],

        externalLinks: formData.github
          ? [formData.github]
          : [],
      };

      await api.post("/projects", payload);

      alert("Project Created Successfully!");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data || "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            Create Project
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="block mb-2 font-semibold">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="ProjectSphere"
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Technologies Used
              </label>

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, Express, PostgreSQL"
                className="w-full border rounded-lg p-3"
              />

              <p className="text-sm text-gray-500 mt-1">
                Separate technologies with commas.
              </p>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Video URL
              </label>

              <input
                type="url"
                name="video"
                value={formData.video}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                GitHub / External Link
              </label>

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full border rounded-lg p-3"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default CreateProject;