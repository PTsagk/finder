import express, { Express, Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

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

// app.use("/user", userRoute);
// app.use("/announcement", announcementRoute);
// app.use("/program", programRoute);
// app.use("/program", programRoute);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
