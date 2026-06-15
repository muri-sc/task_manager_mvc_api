import pool from "../database/connection"

export {
    createTask,
    updateTask,
    deleteTask
}

async function createTask(title: string, userId: number) {
    const query = `
    INSERT INTO tasks (title, user_id)
    VALUES ($1, $2)
    RETURNING id, title, created_at, updated_at
    `
    const values = [title, userId]

    const result = await pool.query(query, values)

    return {
        task: result.rows[0]
    }
}

async function updateTask(title: string, id: number, userId: number) {
    const query = `
    UPDATE tasks
    SET title = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND user_id = $3
    RETURNING id, title, created_at, updated_at
    `
    const values = [title, id, userId]

    const result = await pool.query(query, values)
    if (result.rowCount === 0) throw new Error("TASK_NOT_FOUND")

    return {
        task: result.rows[0]
    }
}

async function deleteTask(id: number, userId: number) {
    const query = `
    DELETE FROM tasks
    WHERE id = $1 AND user_id = $2
    RETURNING *
    `
    const values = [id, userId]

    const result = await pool.query(query, values)
    if (result.rowCount === 0) throw new Error("TASK_NOT_FOUND")

    return result.rows[0]
}