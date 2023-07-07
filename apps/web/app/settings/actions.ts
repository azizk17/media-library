"use server";

import { User, prisma } from "database";
import { updateUser } from "services/src/users.service";
import {
  UPDATE_PREFERENCES_SCHEMA,
  UPDATE_USER_SCHEMA,
} from "./user.validation";

export const updateUserProfile = async ({ id, inputs }) => {
  // check for role and permissions

  // validate
  const result = UPDATE_USER_SCHEMA.safeParse(inputs);
  if (!result.success) {
    console.log("------- user result: ", result.error.flatten());
    return {
      success: false,
      errors: result.error.flatten(),
    };
  }
  console.log(result.data);
  const update = await updateUser({ id, data: result.data });

  // upload avatar
  // update user profile
  // handle error
  // return
};

export async function updatePreferences({ id, inputs }) {
  const result = UPDATE_PREFERENCES_SCHEMA.safeParse(inputs);

  if (!result.success) {
    console.log("-------------- errors", result.error.flatten());
    return {
      success: false,
      errors: result.error.flatten(),
    };
  }
  console.log("------------------------------------------------", result);
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      preferences: result.data,
    },
  });
}
