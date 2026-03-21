import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { handleLogin, handleLogout, handleSignup } from "./handlers/auth.js";
import { serveFeed, servePosts, serveUsername } from "./handlers/feed.js";
import { serveHome } from "./handlers/home.js";
import { handleAddPost } from "./handlers/post.js";

export const createApp = () => {
  const app = new Hono();

  app.use(logger());

  app.get("/", serveHome);
  app.get("/feed", serveFeed);
  app.get("/posts", servePosts);
  app.get("/user-info", serveUsername);

  app.post("/add-post", handleAddPost);
  app.post("/login", handleLogin);
  app.post("/signup", handleSignup);
  app.post("/logout", handleLogout);

  app.get("/*", serveStatic({ root: "public" }));

  return app;
};
