import { deleteCookie, setCookie } from "hono/cookie";

const extractUserInfo = (fd) => {
  const username = fd.get("username");
  const password = fd.get("password");

  return { username, password };
};

const setUserCookie = (ctx, username) => {
  setCookie(ctx, "username", username);
};

export const handleLogin = async (ctx) => {
  const formData = await ctx.req.formData();
  const users = JSON.parse(Deno.readTextFileSync("db/in-memory/users.json"));

  const { username, password } = extractUserInfo(formData);
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    ctx.status(401);
    return ctx.json({ hasError: true, errorCode: 401 });
  }

  setUserCookie(ctx, username);
  return ctx.json({ hasError: false });
};

export const handleSignup = async (ctx) => {
  const formData = await ctx.req.formData();
  const users = JSON.parse(Deno.readTextFileSync("db/in-memory/users.json"));

  const { username, password } = extractUserInfo(formData);

  const user = users.find((user) => user.username === username);
  if (user) {
    ctx.status(409);
    return ctx.json({ hasError: true, errorCode: 409 });
  }

  users.push({ username, password });
  Deno.writeTextFileSync("db/in-memory/users.json", JSON.stringify(users));
  setUserCookie(ctx, username);

  return ctx.json({ hasError: false });
};

export const handleLogout = (ctx) => {
  deleteCookie(ctx, "username");
  ctx.json({ success: true });
};
