import { objectType, queryType } from "nexus";
import { prisma } from "../main";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id"),
      t.string("username"),
      t.string("avatarUrl"),
      t.string("displayName"),
      t.string("gender"),
      t.string("location"),
      t.string("birthday"),
      t.boolean("online");
  },
});

export const Users = queryType({
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve() {
        const users = prisma.user.findMany();
        return users;
      },
    });
  },
});
