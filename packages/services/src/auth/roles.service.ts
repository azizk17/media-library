import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Attach a role to a user
export async function attachRoleToUser(
  userId: number,
  roleName: string
): Promise<void> {
  await prisma.role.create({
    data: {
      userId,
      roleName,
    },
  });
}

// Revoke a role from a user
export async function revokeRoleFromUser(
  userId: number,
  roleName: string
): Promise<void> {
  await prisma.role.deleteMany({
    where: {
      userId,
      roleName,
    },
  });
}

// Check if a user has a specific role
export async function checkUserRole(
  userId: number,
  roleName: string
): Promise<boolean> {
  const userRole = await prisma.role.findFirst({
    where: {
      userId,
      roleName,
    },
  });
  return !!userRole;
}

// Get all roles assigned to a user
export async function getUserRoles(userId: number): Promise<string[]> {
  const userRoles = await prisma.role.findMany({
    where: {
      userId,
    },
    select: {
      roleName: true,
    },
  });
  return userRoles.map((userRole) => userRole.roleName);
}

// Check if a user has any roles assigned
export async function hasAnyRole(userId: number): Promise<boolean> {
  const count = await prisma.role.count({
    where: {
      userId,
    },
  });
  return count > 0;
}

// Check if a user has all of the specified roles
export async function hasAllRoles(
  userId: number,
  roleNames: string[]
): Promise<boolean> {
  const count = await prisma.role.count({
    where: {
      userId,
      roleName: {
        in: roleNames,
      },
    },
  });
  return count === roleNames.length;
}

// Get all users with a specific role
export async function getUsersByRole(roleName: string): Promise<number[]> {
  const usersWithRole = await prisma.role.findMany({
    where: {
      roleName,
    },
    select: {
      userId: true,
    },
  });
  return usersWithRole.map((userRole) => userRole.userId);
}

// Check if a user has permission based on their roles
export async function checkUserPermission(
  userId: number,
  permissionName: string
): Promise<boolean> {
  const userRoles = await getUserRoles(userId);
  // Perform your permission logic based on user roles and permissionName
  // Return true or false based on the permission check
}

// Detach a role from a user
export async function detachRoleFromUser(
  userId: number,
  roleName: string
): Promise<void> {
  await prisma.role.deleteMany({
    where: {
      userId,
      roleName,
    },
  });
}

// Detach all roles from a user
export async function detachAllRolesFromUser(userId: number): Promise<void> {
  await prisma.role.deleteMany({
    where: {
      userId,
    },
  });
}

// Get all roles
export async function getAllRoles(): Promise<string[]> {
  const roles = await prisma.role.findMany({
    select: {
      name: true,
    },
  });
  return roles.map((role) => role.name);
}

// Create a new role
export async function createRole(roleName: string): Promise<void> {
  await prisma.role.create({
    data: {
      name: roleName,
    },
  });
}

// Delete a role
export async function deleteRole(roleName: string): Promise<void> {
  await prisma.role.delete({
    where: {
      name: roleName,
    },
  });
}

// Update a role's name
export async function updateRoleName(
  oldRoleName: string,
  newRoleName: string
): Promise<void> {
  await prisma.role.update({
    where: {
      name: oldRoleName,
    },
    data: {
      name: newRoleName,
    },
  });
}

// Assign a role to multiple users
export async function assignRoleToUsers(
  roleName: string,
  userIds: number[]
): Promise<void> {
  const role = await prisma.role.findUnique({
    where: {
      name: roleName,
    },
  });

  if (!role) {
    throw new Error(`Role '${roleName}' does not exist.`);
  }

  const userRoles = userIds.map((userId) => ({
    userId,
    roleId: role.id,
  }));

  await prisma.role.createMany({
    data: userRoles,
    skipDuplicates: true,
  });
}

// Revoke a role from multiple users
export async function revokeRoleFromUsers(
  roleName: string,
  userIds: number[]
): Promise<void> {
  const role = await prisma.role.findUnique({
    where: {
      name: roleName,
    },
  });

  if (!role) {
    throw new Error(`Role '${roleName}' does not exist.`);
  }

  await prisma.role.deleteMany({
    where: {
      roleId: role.id,
      userId: {
        in: userIds,
      },
    },
  });
}

// Check if a user has a specific permission
export async function hasPermission(
  userId: number,
  permissionName: string
): Promise<boolean> {
  const userRoles = await prisma.role.findMany({
    where: {
      userId,
    },
    select: {
      roleName: true,
    },
  });

  for (const userRole of userRoles) {
    const role = await prisma.role.findUnique({
      where: {
        name: userRole.roleName,
      },
      select: {
        permissions: {
          select: {
            name: true,
          },
        },
      },
    });

    if (
      role?.permissions.some((permission) => permission.name === permissionName)
    ) {
      return true;
    }
  }

  return false;
}

// Get all permissions assigned to a user
export async function getUserPermissions(userId: number): Promise<string[]> {
  const userRoles = await prisma.role.findMany({
    where: {
      userId,
    },
    select: {
      roleName: true,
    },
  });

  const permissions: string[] = [];

  for (const userRole of userRoles) {
    const role = await prisma.role.findUnique({
      where: {
        name: userRole.roleName,
      },
      select: {
        permissions: {
          select: {
            name: true,
          },
        },
      },
    });

    permissions.push(
      ...(role?.permissions.map((permission) => permission.name) || [])
    );
  }

  return permissions;
}
