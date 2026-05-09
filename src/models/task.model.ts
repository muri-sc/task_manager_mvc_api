import pool from "../database/connection"

export {
    createTask
}

async function createTask(title: string) {
    const query = `
    INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, completed, created_at
    `
    const values = [title]

    const result = await pool.query(query, values)
    return result.rows[0]
}