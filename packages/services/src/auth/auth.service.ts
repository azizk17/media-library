// rolesService.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Permission = "create" | "read" | "update" | "delete";

type Role = {
  name: string;
  permissions: Permission[];
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
const _getServerSession = async (ctx: Ctx) => {
  // check req, res is defined (api route)
  if (!ctx.req && !ctx.res) {
    return await _getServerSession(ctx);
  }
  return await getServerSession(ctx.req, ctx.res, authOptions);
};
// Check if the current user is authenticated
export async function isAuthenticated(ctx: Ctx) {
  const session = await _getServerSession(ctx);
  return !!session;
}
// Get the authenticated user
export async function getCurrentUser(ctx: Ctx) {
  const session = await _getServerSession(ctx);
  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });

  return user;
}

// Check if the current user is the owner of a resource
export async function isOwner(ctx: Ctx, resourceId: string) {
  const session = await _getServerSession(ctx);

  if (!session?.user?.id) {
    return false;
  }

  const resource = await prisma.resource.findUnique({
    where: {
      id: resourceId,
    },
  });

  return resource?.userId === session.user?.id;
}

// Update session data for the authenticated user
export async function updateSession(
  session: Session,
  updatedFields: Partial<Session>
) {
  const updatedSession = await prisma.session.update({
    where: {
      accessToken: session.accessToken,
    },
    data: updatedFields,
  });

  return updatedSession;
}

// Check if the current user has a specific permission
export async function hasPermission(ctx: Ctx, permission: string) {
  const session = await _getServerSession(ctx);

  if (!session?.user?.id) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    include: {
      role: {
        include: {
          permissions: true,
        },
      },
    },
  });

  return user?.role.permissions.some((p) => p.name === permission);
}
