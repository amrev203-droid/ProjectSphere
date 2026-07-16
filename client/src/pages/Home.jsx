import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const Home = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const response = await api.get("/projects");

                setProjects(response.data.projects);

            } catch (error) {
                console.error(error);
            }

        };

        fetchProjects();

    }, []);

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">
                    Latest Projects
                </h1>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}

                </div>

            </div>
        </>
    );
};

export default Home;