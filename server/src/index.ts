import routes from "./routes/index.js";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";

import { ConnectDb } from "./config/connectDB.js";
import { errorHandler } from "./middlewares/error-handler.js";

dotenv.config();
ConnectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use(errorHandler);

app.listen(process.env.LOCAL_PORT, () => {
    console.log(`Server is running on port ${process.env.LOCAL_PORT}`);
});
