import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data.project);
      } catch (error) {
        alert(error.response?.data || "Project not found");
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl font-semibold">
            Loading Project...
          </h1>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <h1 className="text-2xl font-semibold">
            Project Not Found
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-4xl font-bold">
            {project.title}
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            {project.description}
          </p>

          <hr className="my-8" />

          <div className="space-y-6">

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Owner
              </h2>

              <p>
                {project.owner.name}
              </p>

              <p className="text-gray-500">
                @{project.owner.username}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Technologies
              </h2>

              <div className="flex flex-wrap gap-2">
                {project.technologies.length > 0 ? (
                  project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <p>No technologies added.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Images
              </h2>

              {project.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Project"
                      className="rounded-lg border"
                    />
                  ))}
                </div>
              ) : (
                <p>No images uploaded.</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Videos
              </h2>

              {project.videos.length > 0 ? (
                project.videos.map((video, index) => (
                  <a
                    key={index}
                    href={video}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 underline"
                  >
                    Video {index + 1}
                  </a>
                ))
              ) : (
                <p>No videos available.</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                External Links
              </h2>

              {project.externalLinks.length > 0 ? (
                project.externalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-blue-600 underline"
                  >
                    {link}
                  </a>
                ))
              ) : (
                <p>No external links.</p>
              )}
            </div>

          </div>

          <Link
            to="/"
            className="inline-block mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            ← Back to Home
          </Link>

        </div>

      </div>
    </>
  );
};

export default ProjectDetails;