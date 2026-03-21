import { deleteCookie, setCookie } from "hono/cookie";
import { login, signup } from "../manager/auth_manager.js";

const extractRequestBody = async (ctx) => {
  const formData = await ctx.req.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  return { username, password };
};

export const handleLogin = async (ctx) => {
  const { username, password } = await extractRequestBody(ctx);

  try {
    login(username, password);
    setCookie(ctx, "username", username);
    return ctx.json({ hasError: false });
  } catch (error) {
    ctx.status(401);
    return ctx.json({ hasError: true, errorCode: 401, error });
  }
};

export const handleSignup = async (ctx) => {
  const { username, password } = await extractRequestBody(ctx);

  try {
    signup(username, password);
    setCookie(ctx, "username", username);
    return ctx.json({ hasError: false });
  } catch (error) {
    ctx.status(401);
    ctx.json({ hasError: true, errorCode: 409, error });
  }
};

export const handleLogout = (ctx) => {
  deleteCookie(ctx, "username");
  return ctx.redirect("/");
};
