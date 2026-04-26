import jwt from "jsonwebtoken"

export {
    createToken
}

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

function createToken(id: number) {
    const token = jwt.sign(
        { id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    )
    return token
}