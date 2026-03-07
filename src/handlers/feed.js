import { getCookie } from "hono/cookie";

export const serveFeed = (ctx) => {
  const username = getCookie(ctx, "username");

  if (!username) return ctx.redirect("/");

  const page = Deno.readTextFileSync("public/feed.html");
  return ctx.html(page);
};

export const servePosts = (ctx) => {
  const posts = Deno.readTextFileSync("db/in-memory/posts.json");
  const parsed = JSON.parse(posts);

  return ctx.json(parsed);
};
