import { auth } from "../auth";

export async function jwtMiddleware(req) {
  if (isPublicPath(req)) return;

  const id = auth.verifyToken();
  req.headers.set("userId", id);
}

function isPublicPath(req) {
  const publicPaths = [
    "POST:/api/account/login",
    "POST:/api/account/logout",
    "POST:/api/account/register",
  ];
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}
