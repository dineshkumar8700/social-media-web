import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { logger } from "hono/logger";
import { handleLogin, handleSignup } from "./handlers/auth.js";
import { serveDashboard } from "./handlers/dashboard.js";

export const createApp = () => {
  const app = new Hono();

  app.use(logger());

  app.get("/dashboard", serveDashboard);

  app.post("/login", (ctx) => {
    return handleLogin(ctx);
  });

  app.post("/signup", (ctx) => {
    return handleSignup(ctx);
  });

  app.get("/*", serveStatic({ root: "public" }));

  return app;
};
