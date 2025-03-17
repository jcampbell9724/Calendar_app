import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
})

export const config = {
  matcher: [
    "/goals/:path*",
    "/notes/:path*",
    "/calendar/:path*",
    "/settings/:path*",
  ],
} 