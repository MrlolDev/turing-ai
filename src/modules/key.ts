import jwt from "jsonwebtoken";
import fs from "fs";
var privateKey = fs.readFileSync("private.key");
export async function getToken() {
  var token = await jwt.sign(
    { id: "host", key: process.env.SECRETKEY },
    privateKey,
    {
      algorithm: "RS256",
    }
  );
  return token;
}

export async function verifyToken(token: string) {
  var decoded = await jwt.verify(token, privateKey, {
    algorithms: ["RS256"],
  });
  if (decoded && decoded.key == process.env.SECRETKEY) {
    return true;
  }
  return false;
}
