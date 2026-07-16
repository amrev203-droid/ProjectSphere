import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-2xl font-bold">
        {project.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {project.description}
      </p>

      <p className="mt-4 text-sm text-blue-600">
        By {project.owner.name}
      </p>

      <Link
        to={`/projects/${project.id}`}
        className="inline-block mt-4 text-blue-500 font-semibold"
      >
        View Details →
      </Link>

    </div>
  );
};

export default ProjectCard;