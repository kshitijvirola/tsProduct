import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.route";
import config from "./config";

// import multer from 'multer';.
// const userRoutes = require("./routes/user");

mongoose
  .connect(config.mongoUri, {
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
  })  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = config.port;
const JWT_SECRET = config.jwtSecret;
const JWT_EXPIRATION_TIME = config.jwtexpirationtime;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

interface User {
  id: number;
  username: string;
  password: string;
}
const users: User[] = [
  {
    id: 1,
    username: "john",
    password: "$2b$10$gYbYXG8BSEUKbJ/WgFlPNO2lK.lHkGzRlymqKkTOgNf/sctkOFa3q", // hashed version of "password1"
  },
  {
    id: 2,
    username: "jane",
    password: "$2b$10$gYbYXG8BSEUKbJ/WgFlPNO2lK.lHkGzRlymqKkTOgNf/sctkOFa3q", // hashed version of "password1"
  },
];

app.get("/", async (req: Request, res: Response) => {
  res.json({ app: "Hello" + req });
});
app.post("/api/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  const isPasswordMatch =
    user && (await bcrypt.compare(password, user.password));
  if (!user && !isPasswordMatch)
    return res.status(401).json({ message: "Invalid username or password" });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  if (users.find((u) => u.username === username))
    return res.status(409).json({ message: "Username already taken" });
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);
  console.log(user);
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
