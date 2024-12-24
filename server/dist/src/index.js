import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
    res.send("Home route");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Current working directory:', process.cwd());
});
