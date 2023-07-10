import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "database";
import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth",
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user)
        token = {
          ...token,
          id: user.id,
          role: user.role,
          prefrences: user.prefrences,
        };
      return token;
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
        prefrences: token.prefrences,
      };
      return session;
    },
    redirect: async () => {
      return "/";
    },
  },
};

/**
 *
 *  Auhentication Functions
 */
type Ctx = {
  req?: NextApiRequest;
  res?: NextApiResponse;
};

// auth helper to get the server session
const _getServerSession = async (ctx?: Ctx) => {
  if (!ctx) {
    return await getServerSession(authOptions);
  }
  // check req, res is defined (api route)
  if (ctx && ctx.req && ctx.res) {
    return await getServerSession(ctx.req, ctx.res, authOptions);
  }
};
// Check if the current user is authenticated
export async function isAuthenticated(ctx: Ctx) {
  const session = await _getServerSession(ctx);
  return !!session;
}
// Get the authenticated user for server side calls (api routes)
export async function getCurrentUser(ctx?: Ctx) {
  const session = await _getServerSession(ctx);
  if (!session?.user) {
    return null;
  }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: session.user?.id,
  //   },
  // });
  const user = null;
  return user;
}
