const Task = require('../models/tasks');

exports.postTaskToDatabase = async(req,res)=>{

    try {

        const {project_id,task,status} = req.body;//destructuring data received from frontend

        const taskToDatabase = await Task.create({project_id,task,status,userEmail : req.user.email});//Frontend --> Controller --> Mongoose Schema

        res.status(201).json(taskToDatabase);

        console.log(Task.collection.name);
        

    } catch (error) {
        console.log("FULL ERROR:", error); // important
        res.status(500).json({error : error.message});
    }
};

exports.getProjectRelatedTaskFromDatabase = async(req,res)=>{

       try {

        const filter = {project_id : req.params.id,userEmail : req.user.email};

        if(req.query.status)
        {
         filter.status = req.query.status;
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

        const {task} = req.body;
        console.log("ID:", req.params.id);
        console.log("BODY:", req.body);
        //General Term : findByIdAndUpdate(id, { task: "New Task" })
        const updateTask = await Task.findByIdAndUpdate(
                                                        req.params.id,// 🔥 task ID

                                                        {task : task},// what to update --> create a property called 'task'(left one) in the update object in MongoDB, 
                                                                      // and assign it the value of the 'variable task'(right one) you just destructured from req.body

                                                        {new : true}  // return updated document;Without { new: true }, 
                                                                      // updateTask would contain the document as it was before the update.
                                                                      // With { new: true },it contains the document after the update.
                                                        
                                                         
                                                       );

        if(updateTask.userEmail !== req.user.email)
        {
          return res.status(403).send({ message: "Forbidden to update Task" });   
        }
        res.status(200).json(updateTask);
        
    } catch (error) {
        console.log("FULL ERROR:", error); // important
        res.status(500).json({error : error.message});
    }
};

exports.updateStatusInDatabase = async(req,res)=>{

    try {
        
        const {status : status} = req.body;

        const updateStatus = await Task.findByIdAndUpdate(req.params.id,{status : status},{new : true});

        if(updateStatus.userEmail !== req.user.email)
        {
          return res.status(403).send({ message: "Forbidden to update Status" });   
        }

        res.status(200).json(updateStatus);
        
        console.log("UPDATED Status:", updateStatus);

    } catch (error) {
        console.log("FULL ERROR:", error); // important
        res.status(500).json({error : error.message});
    }

};