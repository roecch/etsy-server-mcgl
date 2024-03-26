import express from "express";
import cors from "cors";
import session from "express-session";
import Users from "./Users/routes.js";
import Search from "./Search/routes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

Users(app);
Search(app);
app.listen(4000);