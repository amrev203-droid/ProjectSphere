const prisma=require("../config/prisma");
const createProject=async(req,res,next)=>{
    try{
        const {
    title,
    description,
    technologies = [],
    images = [],
    videos = [],
    externalLinks = [],
} = req.body;
        const project=await prisma.project.create({
            data: {
    title,
    description,
    technologies,
    images,
    videos,
    externalLinks,
    ownerId: req.userId,
},

        })
        return res.status(201).json(
            {
                message:"project created succesfully",
                project,
            }
        );}
    catch(error){
    next(error);
}};

const getProjects=async(req,res,next)=>{
    try{
        
       const projects= await prisma.project.findMany({
        include:{
            owner:{
                select:{
                    id:true,
                    username:true,
                    name:true,
                },
            },
        },
       });
       return res.status(200).json({
        projects,
       });
    }
    catch(error){
        next(error);
    };
};

const getProject=async(req,res,next)=>{
    try{const {id}=req.params;
        const projectId=Number(id);
        if(!Number.isInteger(projectId) || projectId<=0){
            return res.status(400).send("invalid project id")
        }
        const project=await prisma.project.findUnique({
            where:{
                id:projectId,
            },
             include:{
            owner:{
                select:{
                    id:true,
                    username:true,
                    name:true,
                },
            },
        },});
        if (!project) {
           return res.status(404) .send("Project not found");
}
        return res.status(200).json({
            message:`project id is ${projectId}`,
            project,
        })
    }
    catch(error){
        next(error);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const projectId = Number(req.params.id);
        const {
    title,
    description,
    technologies,
    images,
    videos,
    externalLinks,
} = req.body;

        if (!Number.isInteger(projectId) || projectId <= 0) {
            return res
                .status(400)
                .send("Invalid project ID");
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        if (!project) {
            return res.status(404).send("Project not found");
        }

        if (project.ownerId !== req.userId) {
            return res.status(403).send("You cannot update this project");
        }

        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
           data: {
    title,
    description,
    technologies,
    images,
    videos,
    externalLinks,
},
        });

        return res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const projectId = Number(req.params.id);

        if (!Number.isInteger(projectId) || projectId <= 0) {
            return res
                .status(400)
                .send("Invalid project ID");
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        if (!project) {
            return res.status(404) .send("Project not found");
        }

        if (project.ownerId !== req.userId) {
            return res.status(403).send("You cannot delete this project");
        }

        await prisma.project.delete({
            where: {
                id: projectId,
            },
        });

        return res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};


module.exports={createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
};
