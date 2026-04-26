import "dotenv/config"
import app from "./app"

function validateEnv() {
    const requiredEnvs = [
        "PORT",
        "DB_HOST",
        "DB_PORT",
        "DB_USER",
        "DB_PASSWORD",
        "DB_NAME",
        "SALT_ROUNDS",
        "JWT_SECRET",
        "JWT_EXPIRES_IN"
    ]

    for (const env of requiredEnvs) {
        if (!process.env[env]) {
            throw new Error(`Incomplete .env`)
        }
    }
}

validateEnv()

const PORT = Number(process.env.PORT)

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`)
})