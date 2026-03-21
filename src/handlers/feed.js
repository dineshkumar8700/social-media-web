import { getCookie } from "hono/cookie";
import { getPosts } from "../manager/post_manager.js";

export const serveFeed = (ctx) => {
  const username = getCookie(ctx, "username");
  if (!username) return ctx.redirect("/");

  return ctx.redirect("/feed.html");
};

export const servePosts = (ctx) => {
  const posts = getPosts();
  return ctx.json(posts);
};

export const serveUsername = (c) => {
  const username = getCookie(c, "username");
  return c.json({ username });
};
