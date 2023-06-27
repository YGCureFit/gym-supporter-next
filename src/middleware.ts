import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sso, Request } from "@curefit/cf-commons-middleware";
// import { mockSSOMiddleware } from "./mock/middleware/mockSSOMiddleware";

// This function can be marked `async` if using `await` inside

function mockSSOMiddleware(req: any, res: any, next: any) {
  req.user = "prashant.gupta@curefit.com";
  req.userContext = {
    tenant: "CUREFIT",
    email: "prashant.gupta@curefit.com",
    phone: null,
    name: "prashant gupta",
    firstName: "prashant",
    lastName: "gupta",
    isActive: true,
    externalRefId: "",
    id: "463",

    memberships: [{ context: "all", roleName: "CENTER_MANAGER" }],
  };
}

export function middleware(request: NextRequest) {
  sso.authenticate(request, undefined, () => {});
  mockSSOMiddleware(request, undefined, undefined);
  // console.log(sso.loginController);
  console.log("hello");
  // return NextResponse.redirect(new URL('/fitso', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/lodash",
};
