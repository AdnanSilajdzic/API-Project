import bcrypt from "bcrypt";
import { Request, Response } from "express";

//export function that checks if password is correct with bcrypt and returns a boolean and takes string as argument
export default async function Authenticate(password: string) {
  const hashedPassword = process.env.PASSWORD;
  const passwordCorrect = await bcrypt.compare(password, hashedPassword!);
  return passwordCorrect;
}
