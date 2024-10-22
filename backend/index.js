import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import usersRoutes from "./routes/users.router.js"
import { connectDB } from "./utils/db.js"
import courseRoutes from "./routes/courses.router.js"
import eventRoutes from "./routes/events.router.js"
import cors from "cors";
import enrollmentRoutes from "./routes/enrollment.router.js";
import path from "path"

const app = express()
app.use(express.json())
dotenv.config()
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173", // Your client origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range"],
}));

const PORT = process.env.PORT || 5000


app.use("/api/users", usersRoutes)
app.use("/api/courses", courseRoutes)
app.use('/api/events', eventRoutes);
app.use('/api/enrollments', enrollmentRoutes);

const __dirname = path.resolve()
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.use("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}
app.listen(PORT, ()=>{
    connectDB()
    console.log("Running on port:5000");
})
