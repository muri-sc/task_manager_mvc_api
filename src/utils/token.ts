import jwt from "jsonwebtoken"

export {
    createToken,
    validateToken
}

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

type TokenPayloladDTO = {
    id: number
}

function createToken(id: number) {
    const payload: TokenPayloladDTO = { id: id }
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    )
    return token
}

function validateToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    } catch (err) {
        throw new Error("Invalid or not provided token")
    }
}