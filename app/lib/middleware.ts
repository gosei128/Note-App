import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import validator from "validator";
export interface DecodedToken {
  userId: string;
}
export function verifyToken(request: NextRequest): DecodedToken {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  console.log(validator.isEmail("Roni"));
  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as DecodedToken;

  return decoded;
}
