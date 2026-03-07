import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { handleLogin, handleLogout, handleSignup } from "./handlers/auth.js";
import { serveFeed, servePosts } from "./handlers/feed.js";

export const createApp = () => {
  const app = new Hono();

  app.use(logger());

  app.get("/feed", serveFeed);

  app.get("/posts", servePosts);

  app.post("/login", handleLogin);

  app.post("/signup", handleSignup);

  app.get("/logout", handleLogout);

  app.get("/*", serveStatic({ root: "public" }));

  return app;
};
