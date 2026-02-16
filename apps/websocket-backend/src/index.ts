import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", (ws, request) => {
  const url = request.url; // request url like ws://localhost:8000/?token=abcd1234

  if (!url) return ws.close();

  const queryParams = new URLSearchParams(url.substring(url.indexOf("?")));
  const token = queryParams.get("token");
  const decodedToken = jwt.verify(token ?? "", jwtSecret);

  if (!decodedToken || !(decodedToken as JwtPayload).userId) {
    return ws.close();
  }

  ws.on("message", (message) => {
    ws.send("pong");
  });
});
