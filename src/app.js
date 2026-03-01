import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { handleLogin, handleSignup } from "./handlers/auth.js";

export const createApp = () => {
  const app = new Hono();

  app.get("/*", serveStatic({ root: "public" }));

  app.post("/login", (ctx) => {
    return handleLogin(ctx);
  });

  app.post("/signup", (ctx) => {
    return handleSignup(ctx);
  });

  return app;
};
