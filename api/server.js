import path from "path";
import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import xssClean from "xss-clean";
import colors from "colors";
const morgan = require("morgan");
// import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";

import connectedDB from "./services/db";

import handleError from "./middlewares/errorHandler";
import authRoutes from "./routes/auth";

// Loading variables from config ifle
dotenv.config();

const app = express();

// Connection to mongodb
connectedDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable cross origin
app.use(cors());

// Prevent xss attact
app.use(xssClean());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Mount Routes
app.use("/api/v2021/auth", authRoutes);

// Handle errors
app.use(handleError);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Server is running port ${port} and ${process.env.NODE_ENV}`.yellow.bold
  );
});
