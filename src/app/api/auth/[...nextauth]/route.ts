import { sso } from "@curefit/cf-commons-middleware";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return sso.loginController;
}
