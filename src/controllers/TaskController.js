import { pool } from "../database/index.js";

class TaskController {
    async createTask({taskName, description, isCompleted, created_at, updated_at}) {
        const [result] = await pool.query(`
        INSERT INTO tasks (taskName, description, isCompleted, created_at, updated_at) VALUES (?, ?, ?, ?, ?)
        `, [taskName, description, isCompleted, created_at, updated_at])
        return [result]
    }

    async listAllTasks() {
        const [rows] = await pool.query(`
        SELECT * FROM tasks
        `)
        return rows;
    }

    async getTaskById(id) {
        const [rows] = await pool.query(`
        SELECT * FROM tasks WHERE id = ${id}
        `)
        return rows
    }

    async updateTaskStatus({id, isCompleted}) {
        const [rows] = await pool.query(`
        UPDATE tasks SET isCompleted = ? WHERE id = ${id}
        `, [isCompleted, id])
        return rows
    }

    async updateTask({id, taskname, description}) {
        const [rows] = await pool.query(`
        UPDATE tasks SET taskname = ?, description = ? WHERE id = ${id}
        `, [taskname, description, id])
        return rows
    }

    async deleteTask(id) {
        const [rows] = await pool.query(`
            DELETE FROM tasks WHERE id = ${id}
        `)
        return rows
    }
}

export {TaskController}

