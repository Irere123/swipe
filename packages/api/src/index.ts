import express from "express";

const main = async () => {
  const app = express();

  app.get("/", (_req, res) => {
    res.send("Hello world");
  });

  app.listen(4000, () => {
    console.log("🚀🚀 Server listening on http://localhost:4000");
  });
};

main();
