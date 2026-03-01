import { Eta } from "eta";

export const serveDashboard = (ctx) => {
  const eta = new Eta({ views: "public/templates" });
  const posts = JSON.parse(Deno.readTextFileSync("db/in-memory/posts.json"));
  const page = eta.render("dashboard.html", { posts });

  return ctx.html(page);
};
