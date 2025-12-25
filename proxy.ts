import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (!token) return false;

        const path = req.nextUrl.pathname;

        if (path.startsWith("/dashboard/admin")) {
          return token.role === "admin";
        }

        if (path.startsWith("/dashboard/founder")) {
          return token.role === "founder";
        }

        if (path.startsWith("/dashboard/startup")) {
          return token.role === "startup";
        }

        if (path.startsWith("/dashboard/member")) {
          return token.role === "member";
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
