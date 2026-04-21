import pool from "../database/connection"
import { hashPassword } from "../utils/hash"

export {
    createUser
}

async function findUserByEmail(email: string) {
    const query = `
    SELECT id FROM users WHERE email = $1
    `
    const values = [email]

    const data = await pool.query(query, values)
    return data.rows[0]
}

async function createUser(email: string, password: string) {
    const userExists = await findUserByEmail(email)
    if (userExists) throw new Error("User already exists")

    const hash = await hashPassword(password)

    const query = `
    INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id
    `
    const values = [email, hash]

    const data = await pool.query(query, values)
    return data.rows[0]
}