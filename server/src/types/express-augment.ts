import type { JwtPayload } from "jsonwebtoken";
import type { AuthPayload } from "./auth";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload & AuthPayload;
  }
}
