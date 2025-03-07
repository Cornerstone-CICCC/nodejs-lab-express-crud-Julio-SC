import express, {NextFunction, Request, Response} from "express"
import dotenv from "dotenv"
import cors from "cors"
import employeeRouter from "./routes/employee.routes"

dotenv.config()

// Create Server
const app = express()

// Middleware
app.use(express.json()) // Allow JSON
app.use(cors()) // Allow frontend to send requests
app.use("/", employeeRouter)

app.use((req, res, next) => {
    res.status(404).send("404 Not Found")
})




// Start server
const PORT = process.env.PORT || 3500
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})