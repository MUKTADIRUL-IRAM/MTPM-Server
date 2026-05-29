const Task = require('../models/tasks');
const User = require('../models/users');
const WorkSpace = require('../models/workSpace');
const Project = require('../models/projects');

exports.postTaskToDatabase = async(req,res)=>{

    try {
        // const user = await User.findOne({email : req.user.email});
        const user = req.dbUser;

        const {project_id,task,status,workSpaceId} = req.body;//destructuring data received from frontend

        const taskToDatabase = await Task.create({project_id,task,status,workSpaceId,ownerId : user._id});//Frontend --> Controller --> Mongoose Schema

        res.status(201).json(taskToDatabase);

        console.log(Task.collection.name);
        

    } catch (error) {
        console.log("FULL ERROR:", error); // important
        res.status(500).json({error : error.message});
    }
};

exports.getProjectRelatedTaskFromDatabase = async(req,res)=>{

       try {

        // const user = await User.findOne({email : req.user.email});

        const user = req.dbUser;

        const project = await Project.findOne({_id : req.params.id });

        if(!project)
        {
         return res.status(404).send({message : "Project not found"});
        }

        const filter = {project_id : req.params.id};

        // Optional status filtering
        if(req.query.status)
        {
         filter.status = req.query.status;//Why Does req.query.status Have Value?Because query parameters come from URL
        }

        // Authorization
        if(project.ownerId.toString() !== user._id.toString())
        {
         return res.status(403).send({message : "Unauthorized"});
        }
           
        const projectRelatedTaskFromDatabase = await Task.find(filter);//Task.find() returns an array of tasks

        res.status(200).json(projectRelatedTaskFromDatabase);

       } catch (error) {
        console.log("FULL ERROR:", error); // important
        res.status(500).json({error : error.message});
       }

};

exports.updateTaskInDataBase = async(req,res)=>{

    try {

        // const user = await User.findOne({email : req.user.email});
        const user = req.dbUser;
        const {task} = req.body;
        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);
        //General Term : findByIdAndUpdate(id, { task: "New Task" },{new : true})
        const existingTask = await Task.findOne({_id : req.params.id});

        if(!existingTask)
        {
            return res.status(404).send({message:"Task Not Found"});
        }

         
        if(existingTask.ownerId.toString() !== user._id.toString())
        {
          return res.status(403).send({ message: "Forbidden to update Task" });   
        }

        const updateTask = await Task.findOneAndUpdate(
                                                        {_id : req.params.id,// 🔥 task ID
                                                         ownerId : user._id
                                                        },

                                                        {task : task},// what to update --> create a property called 'task'(left one) in the update object in MongoDB, 
                                                                      // and assign it the value of the 'variable task'(right one) you just destructured from req.body

                                                        {new : true}  // return updated document;Without { new: true }, 
                                                                      // updateTask would contain the document as it was before the update.
                                                                      // With { new: true },it contains the document after the update.
                                                        
                                                         
                                                       );
       

       
        res.status(200).json(updateTask);
        
    } catch (error) {
        console.log("FULL ERROR:", error); // important
        res.status(500).json({error : error.message});
    }
};

exports.updateStatusInDatabase = async(req,res)=>{

    try {

        const user = req.dbUser;
        // const user = await User.findOne({email : req.user.email});

        const existingStatus = await Task.findOne({_id : req.params.id});

        if(!existingStatus)
        {
            return res.status(404).send({message:"Status Not Found"});
        }
        
        const {status : status} = req.body;

        if(existingStatus.ownerId.toString() !== user._id.toString())
        {
          return res.status(403).send({ message: "Forbidden to update Task" });   
        }

        const updateStatus = await Task.findOneAndUpdate({_id : req.params.id,ownerId : user._id},{status : status},{new : true});

        res.status(200).json(updateStatus);
        
        console.log("UPDATED Status : ", updateStatus);

    } catch (error) {
        console.log("FULL ERROR:", error); // important
        res.status(500).json({error : error.message});
    }

};

//The reason developers create a filter object separately is: Because later conditions may be added.Like :

// const filter = {
//    project_id : req.params.id
// };

// if(req.query.status)
// {
//    filter.status = req.query.status;
// }

// if(req.query.priority)
// {
//    filter.priority = req.query.priority;
// }

// if(req.query.assignedTo)
// {
//    filter.assignedTo = req.query.assignedTo;
// }

// const tasks = await Task.find(filter);