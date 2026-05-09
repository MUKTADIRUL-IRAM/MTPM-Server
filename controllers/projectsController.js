const Project = require('../models/projects');

exports.postProjectsToDataBase = async(req,res)=>{

    try {
        const email = req.user.email;
        const {project_Name : projectName} = req.body;

        console.log("Req Body : ",req.body);
        console.log("projectName : ",projectName);
        

        const saveToDataBase = await Project.create({project_Name : projectName,userEmail : email});//The variable naming 
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

        const fetchedProjects = await Project.find({userEmail : req.user.email});

        res.status(200).json(fetchedProjects);

        console.log(Project.collection.name);
    
    }catch(error){
       res.status(500).json({error : error.message});
    }
        
    
};

//Variable name -> camelCase (e.g fetchedProjects)

exports.getSingleProject = async(req,res)=>{

    try{
    
    const singleProject = await Project.findById(req.params.id);

    if(singleProject.userEmail !==  req.user.email)
    {
      return res.status(403).send({ message: "Forbidden to get Single Projects" });
    }

    res.status(200).json(singleProject);

    }catch(error){
        res.status(500).json({error : error.message});
    }
};

