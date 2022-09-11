import { objectType, queryType } from "nexus";
import { prisma } from "../main";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id"),
      t.string("username"),
      t.string("avatarUrl"),
      t.string("displayName"),
      t.string("bio"),
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
    t.list.field("leaderboard", {
      type: "User",
      async resolve() {
        const data = await prisma.$queryRaw`
          select u.id, "numLikes", "displayName", "username", "birthday", bio, "avatarUrl"
          from users u
          order by u."numLikes" DESC
          limit 10
        `;

        return data;
      },
    });
  },
});
