import { Eta } from "eta";
import { getCookie } from "hono/cookie";

export const serveDashboard = (ctx) => {
  const eta = new Eta({ views: "public/templates" });
  const posts = JSON.parse(Deno.readTextFileSync("db/in-memory/posts.json"));
  const username = getCookie(ctx, "username");

  const page = eta.render("dashboard.html", { posts, username });

  return ctx.html(page);
};
