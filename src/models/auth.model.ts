import pool from "../database/connection"
import { hashPassword, comparePassword } from "../utils/hash"
import { createToken } from "../utils/token"

export {
    createUser,
    loginUser
}

async function findUserByEmail(email: string) {
    const query = `
    SELECT * FROM users WHERE email = $1
    `
    const values = [email]

    const result = await pool.query(query, values)
    return result.rows[0]
}

async function createUser(email: string, password: string) {
    const userExists = await findUserByEmail(email)
    if (userExists) throw new Error("User already exists")

    const hash = await hashPassword(password)

    const query = `
    INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email
    `
    const values = [email, hash]

    const result = await pool.query(query, values)
    return result.rows[0]
}

async function loginUser(email: string, password: string) {
    const user = await findUserByEmail(email)
    if (!user) throw new Error("Invalid email or password")

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) throw new Error("Invalid email or password")

    const token = createToken(user.id)
    return {
        token: token,
        user: {
            id: user.id,
            email: user.email
        }
    }
}