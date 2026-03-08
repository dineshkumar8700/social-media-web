import { getCookie } from "hono/cookie";

export const hanleAddPost = async (ctx) => {
  const posts = JSON.parse(Deno.readTextFileSync("db/in-memory/posts.json"));
  const formData = await ctx.req.formData();
  const content = formData.get("content");
  const username = getCookie(ctx, "username");

  const post = {
    postId: 11,
    author: { name: username, username: `@${username}` },
    time_ago: "Just now",
    content,
    comments: 0,
    likes: 0,
  };

  console.log("New Post", post);
  posts.unshift(post);
  console.log(posts);

  return ctx.json(post);
};
