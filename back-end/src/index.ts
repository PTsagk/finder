import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import multer from "multer";

const upload = multer();
//For env File
dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true, limit: 4000000 }));
app.use(express.json({ limit: 4000000 }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:8100"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// app.use(upload.array())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//     limit: 4000000,
//     parameterLimit: 50000,
//   })
// );
// app.use(cookieParser());
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server!!!!");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
