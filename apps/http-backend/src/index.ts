import express from "express";
import jwt from "jsonwebtoken";
import {
  createRoomSchema,
  signUpSchema,
  singInSchema,
} from "@repo/common/type";
import { jwtSecret } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import prismaClient from "@repo/db/client";

const app = express();

app.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedBody = signUpSchema.safeParse(body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const user = await prismaClient.user.create({
    data: {
      email: parsedBody.data.email,
      name: parsedBody.data.name,
      password: parsedBody.data.password,
    },
    select: {
      id: true,
    },
  });

  const token = jwt.sign({ userId: user.id }, jwtSecret);
  res.json({ token });
});

app.post("/signin", (req, res) => {
  const body = req.body;
  const parsedBody = singInSchema.safeParse(body);
  const userId = 1;
  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }
  const token = jwt.sign({ userId }, jwtSecret);
  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  const body = req.body;
  const parsedBody = createRoomSchema.safeParse(body);

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  res.json({ roomId: 1 });
});

app.listen(3000, () => {
  console.log("http server started on port 3000");
});
