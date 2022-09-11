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
      t.string("numLikes"),
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
    t.field("me", {
      type: "User",
      resolve(_root, _args, { req }) {
        const user = prisma.user.findFirst({ where: { id: req.userId } });

        if (user) {
          return user;
        }
        return null;
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
    t.list.field("topPeople", {
      type: "User",
      async resolve() {
        const data = await prisma.$queryRaw`
          select u.id, "numLikes", "displayName", "username", "birthday", bio, "avatarUrl"
          from users u
          order by u."numLikes" DESC
          limit 5
        `;

        return data;
      },
    });
  },
});
