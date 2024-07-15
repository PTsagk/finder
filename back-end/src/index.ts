import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import multer from "multer";
import brandRoute from "./routes/brand.route";
import colorRoute from "./routes/color.route";
import favouriteRoute from "./routes/favourite.route";
import productRoute from "./routes/product.route";
import reviewRoute from "./routes/review.route";
import sizeRoute from "./routes/size.route";
import userRoute from "./routes/user.route";

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

app.use("/user", userRoute);
app.use("/review", reviewRoute);
app.use("/brand", brandRoute);
app.use("/product", productRoute);
app.use("/color", colorRoute);
app.use("/size", sizeRoute);
app.use("/favourite", favouriteRoute);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
