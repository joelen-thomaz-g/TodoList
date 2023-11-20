import { Router } from "express";
import { TaskController } from "../controllers/TaskController.js";

const routes = Router();
const taskController = new TaskController()

routes.post("/task", async (req, res) => {
    const {taskName, description} = req.body
    const data = {
        taskName,
        description,
        isCompleted: false,
        created_at: `${new Date()}`,
        updated_at: `${new Date()}`
    }
    await taskController.createTask(data)
    res.status(201).json(data)
})

routes.get("/task", async (req, res) => {
    const allTasks = await taskController.listAllTasks();
    res.status(200).json(allTasks)
})

routes.get("/task/:id", async (req, res) => {
    const{id} = req.params;
    const taskId = await taskController.getTaskById(id);
    if(taskId[0] === undefined) {
        res.status(400).json('Tarefa não existe')
    }
    res.status(200).send(taskId)
})

routes.patch("/task/:id/done", async (req, res) => {
    const {id} = req.params;
    const isCompleted = true
    await taskController.updateTaskStatus ({id, isCompleted})
    res.status(201).json('Tarefa Concluída')
})

routes.put("/task/:id", async (req, res) => {
    const {id} = req.params;
    const {taskname, description} = req.body;
    const updatedTask = await taskController.updateTask({id, taskname, description});
    if(!updatedTask) {
        res.status(404).json("Erro ao atualizar a tarefa");
    } else {
        res.status(201).json("Tarefa atualizada com sucesso");
    }
}) 

routes.delete("/task/:id", async (req, res) => {
    const {id} = req.params;
    const deleteTaskById = await taskController.deleteTask(id);
    if(!deleteTaskById) {
        res.status(400).json ("Esta tarefa não existe");
    } else {
        res.status(204).json ("Tarefa deletada com sucesso");
    }
})

export {routes};