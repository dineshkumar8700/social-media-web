import { getCookie } from "hono/cookie";
import { addPost } from "../manager/post_manager.js";

export const handleAddPost = async (ctx) => {
  const formData = await ctx.req.formData();
  const content = formData.get("content");
  const username = getCookie(ctx, "username");

  try {
    const post = addPost(content, username);
    return ctx.json(post);
  } catch (error) {
    ctx.status = 400;
    return ctx.json({ hasError: true, error });
  }
};
