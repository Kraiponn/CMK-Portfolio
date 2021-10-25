const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const xssClean = require("xss-clean");
const colors = require("colors");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

const connectedDB = require("./services/db");

const handleError = require("./middlewares/errorHandler");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Loading variables = require(config ifle
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
app.use("/api/v2021/users", userRoutes);

// Handle errors
app.use(handleError);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(
    `Server is running port ${port} and ${process.env.NODE_ENV}`.yellow.bold
  );
});
