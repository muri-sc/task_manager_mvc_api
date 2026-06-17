import pool from "../database/connection"

export {
    deleteUser
}

async function deleteUser(userId: number) {
    const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING id
    `
    const values = [userId]

    const result = await pool.query(query, values)
    if (result.rowCount === 0) throw new Error("USER_NOT_FOUND")

    return result.rows[0]
}