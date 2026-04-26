import bcrypt from "bcryptjs"

export {
    hashPassword,
    comparePassword
}

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)

async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    return hash
}

async function comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash)
    return isMatch
}