import pool from "../database/connection"

export {
    createTask,
    deleteTask
}

async function findTaskById(id: number) {
    const query = `
    SELECT * FROM tasks WHERE id = $1
    `
    const values = [id]

    const result = await pool.query(query, values)
    return result.rows[0]
}

async function createTask(title: string, userId: number) {
    const query = `
    INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING id, title, created_at
    `
    const values = [title, userId]

    const result = await pool.query(query, values)
    return result.rows[0]
}

async function deleteTask(id: number, userId: number) {
    const taskExists = await findTaskById(id)
    if (!taskExists) throw new Error("Task not found")

    const query = `
    DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *
    `
    const values = [id, userId]

    const result = await pool.query(query, values)
    if (result.rowCount === 0) throw new Error("Unauthorized")

    return result.rows[0]
}