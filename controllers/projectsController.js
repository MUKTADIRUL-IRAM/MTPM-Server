const Project = require('../models/projects');
const User = require('../models/users');
const WorkSpace = require('../models/workSpace');

exports.postProjectsToDataBase = async(req,res)=>{

    try {
        const email = req.user.email;

        const {project_Name : projectName,workSpaceId} = req.body;

        console.log("Req Body : ",req.body);

        console.log("projectName : ",projectName);

        // const user = await User.findOne({email : req.user.email});
        const user = req.dbUser;

        const saveToDataBase = await Project.create({project_Name : projectName,workSpaceId,
                                                    // tenantId : user.tenantId,
                                                    ownerId : user._id});//The variable naming 
                                                                         //convention inside create 
                                                                         //must match the schema name
                                                                         //e.g schema has 
                                                                         // "project_Name" that's 
                                                                         // why we take the value 
                                                                         // of "projectName" inside 
                                                                         // "project_Name"
        
        res.status(201).json(saveToDataBase);
        
    } catch (error) {

        console.log("FULL ERROR from postProjectsToDataBase of Project Controller  : ", error); // important
        res.status(500).json({error : error.message});
    }

};

exports.getProjects = async(req,res)=>{

    try{
        //  const user = await User.findOne({email : req.user.email});

        const user = req.dbUser;

        const workSpace = await WorkSpace.findOne({_id : req.params.workSpaceId,"members.userId" : user._id});

        if(!workSpace)
        {
            return res.status(403).send({message : "Access denied to this WorkSpace"});
        }

        const fetchedProjects = await Project.find({workSpaceId : req.params.workSpaceId});

        res.status(200).json(fetchedProjects);

        console.log(Project.collection.name);
    
    }catch(error){
       res.status(500).json({error : error.message});
    }
        
    
};

//Variable name -> camelCase (e.g fetchedProjects)

exports.getSingleProject = async(req,res)=>{

    try{

    // const user = await User.findOne({email : req.user.email});

    const user = req.dbUser;

    const singleProject = await Project.findById({_id : req.params.id});

    if(!singleProject)
    {
      return res.status(404).send({ message: "Project not found" });
    }

    const workSpace = await WorkSpace.findOne({_id : singleProject.workSpaceId,"members.userId" : user._id});

    if(!workSpace)
    {
        return res.status(403).send({message : "Access denied to this WorkSpace"});
    }

    res.status(200).json(singleProject);

    }catch(error){
        res.status(500).json({error : error.message});
    }
};


exports.deleteProjectFromDataBase = async(req,res)=>{

    try {
        
        // const user = await User.findOne({email : req.user.email});
        const user = req.dbUser;

        const project = await Project.findOne({_id : req.params.projectId});

        if(!project)
        {
            return res.status(404).send({message:"Project not found"});
        }

        const workSpace = await WorkSpace.findOne({_id : project.workSpaceId,"members.userId" : user._id});

        if(!workSpace)
        {
            return res.status(403).send({message : "Forbidden"});
        }

        if(project.ownerId.toString() !== user._id.toString())
        {
            return res.status(403).send({message:"Only owner can delete project"});
        } 

        await Project.findByIdAndDelete({_id : req.params.projectId});

        res.status(200).json({message:"Project Successfully Deleted"});

    } catch (error) {
        res.status(500).json({error : error.message});
    }

};
