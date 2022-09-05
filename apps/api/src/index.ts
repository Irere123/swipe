import "dotenv-safe/config";
import express from "express";
import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { DevOnly, UserOnly } from "./routes";
import { FBProfile, TWProfile } from "./types/Profiles";
import { createTokens } from "./lib/tokenUtils";
import { __prod__ } from "./lib/constants";
import { isAuth } from "./lib/isAuth";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      maxAge: __prod__ ? 86400 : undefined,
      exposedHeaders: [
        "access-token",
        "refresh-token",
        "content-type",
        "content-length",
      ],
    })
  );
  app.use(passport.initialize());

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CLIENT_ID,
        consumerSecret: process.env.TWITTER_CLIENT_SECRET,
        callbackURL: "/auth/twitter/callback",
      },
      async (_accessToken, _refreshToken, userProfile, cb) => {
        const profile = userProfile as unknown as TWProfile;
        console.log(profile);

        let user = await prisma.user.findFirst({
          where: { twitterId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: profile.displayName,
              avatarUrl: "",
              bio: "Tell us something about you",
              birthday: "",
              gender: profile.gender,
              schoolName: "",
              location: profile.provider,
              twitterId: profile.id,
            },
          });
        }

        const tokens = createTokens(user);

        cb(null, {
          refreshToken: tokens.refreshToken,
          accessToken: tokens.accessToken,
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      async (_, __, userProfile, cb) => {
        const profile = userProfile as unknown as FBProfile;

        let user = await prisma.user.findFirst({
          where: { facebookId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              facebookId: profile.id,
              username: profile.username!,
              avatarUrl: profile.profileUrl!,
              bio: "",
              birthday: profile.birthday!,
              gender: profile.gender!,
              schoolName: "",
              location: "",
            },
          });
        }

        const tokens = createTokens(user);

        cb(null, {
          refreshToken: tokens.refreshToken,
          accessToken: tokens.accessToken,
        });
      }
    )
  );

  app.get("/", (_req, res) => {
    res.json({ error: "Not found" }).status(404);
  });
  app.get("/me", isAuth(), async (req, res) => {
    const user = await prisma.user.findFirst({ where: { id: req.userId } });

    return res.json({ user }).status(404);
  });

  app.use("/dev", DevOnly);
  app.use("/user", isAuth(), UserOnly);

  app.get(
    "/auth/twitter",
    passport.authenticate("twitter", { session: false })
  );
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { session: false })
  );

  app.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", { session: false }),
    (_req, res) => {
      res.redirect("http://localhost:3000/");
    }
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    (_req, res) => {
      res.redirect("http://localhost:3000/");
    }
  );

  app.listen(4000, () => {
    console.log("🚀🚀🚀 Running API server at http://localhost:4000");
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
