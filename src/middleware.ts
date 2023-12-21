import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === "/") {
    const { searchParams } = request.nextUrl;

    const username = searchParams.get("username");

    if (username) {
      return NextResponse.redirect(
        new URL(`/game?username=${username}`, request.url),
      );
    }
  }

  if (request.nextUrl.pathname === "/game") {
    const { searchParams } = request.nextUrl;

    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
};

export default middleware;
