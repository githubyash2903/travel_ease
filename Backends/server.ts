import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import pool from "./src/config/db";
import authRoutes from "./src/router/auth";
import adminRoutes from "./src/router/adminRoutes";
import userRoutes from "./src/router/userRoutes";
import { initializeDatabase, checkTablesExist } from "./src/config/script";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5100);

// 1. Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

// 2. Health Check Route
app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ 
        status: "UP", 
        timestamp: new Date().toISOString(),
        db: pool.totalCount > 0 ? "Connected" : "Connecting"
    });
});

// 3. Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes)
app.use("/api/user",userRoutes);

// 4. Global Error Handler (Prevents crashing on unexpected errors)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("❌ Global Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// 5. Database Initialization Function
async function startServer() {
    try {
        // Check if tables exist, if not, initialize database
        const tablesExist = await checkTablesExist();
        
        if (!tablesExist) {
            console.log("📋 Database tables not found. Initializing database...");
            await initializeDatabase();
        } else {
            console.log("✅ Database tables already exist. Skipping initialization.");
        }

        // Start the server
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
        });

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n📛 Shutting down server gracefully...');
            server.close(() => {
                console.log('✅ Server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error("💥 Failed to start server:", error);
        process.exit(1);
    }
}

// Start the application
startServer();
