import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
const app: Application = express();

import { getToken, verifyToken } from "./modules/key.js";
import filter from "./modules/filter/index.js";
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
// key middleware
app.use(async (req: Request, res: Response, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      var isvalid = await verifyToken(token);
      if (isvalid) {
        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(app.get("port"), async () => {
  console.log(`Server is running on port ${app.get("port")}`);
  var token = await getToken();
  console.log(token);
});

// filter route
app.post("/filter", async (req: Request, res: Response) => {
  var { prompt, model } = req.body;
  var result = await filter(prompt, model);
  res.json({ isCP: result }).status(200);
});
