import { Eta } from "eta";
import { getCookie } from "hono/cookie";

export const serveDashboard = (ctx) => {
  const username = getCookie(ctx, "username");

  if (!username) return ctx.redirect("/");

  const eta = new Eta({ views: "public/templates" });
  const posts = JSON.parse(Deno.readTextFileSync("db/in-memory/posts.json"));

  const page = eta.render("dashboard.html", { posts, username });

  return ctx.html(page);
};
