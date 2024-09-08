import express, { NextFunction, Request, Response } from "express";
import appMiddleware from "./middleware/configuration.middleware";
import { connectDB } from "./database/dbConnection";
import router from "./routes";
import cors from "cors";

const app = express();
appMiddleware();

app.use(cors());

app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  return res.status(200).json({ messagae: "You are ready to explore" });
});

app.get("/health", (_: Request, res: Response) => {
  return res.status(200).json({ messagae: "I'm okay!" });
});

app.use("/api/v1", router);

// Define the port for your server
const PORT = process.env.PORT || 5500;

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error message for debugging

  if (res.headersSent) {
    return next(err); // Delegate to the default Express error handler if headers are already sent
  }

  const statusCode = (err as any).statusCode || 500; // Default to 500 if status code is not set
  res.status(statusCode).json({ error: err.message }); // Send JSON response with error message
});

// Start the Express server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
