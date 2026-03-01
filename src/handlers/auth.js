const extractUserInfo = (fd) => {
  const username = fd.get("username");
  const password = fd.get("password");

  return { username, password };
};

export const handleLogin = async (ctx) => {
  const formData = await ctx.req.formData();
  const users = JSON.parse(Deno.readTextFileSync("db/in-memory/users.json"));

  const { username, password } = extractUserInfo(formData);

  const user = users.find((user) => {
    return user.username === username;
  });

  if (!user || user.password !== password) {
    return ctx.text("incorrect username or password");
  }

  return ctx.redirect("/dashboard.html", 303);
};

export const handleSignup = async (ctx) => {
  const formData = await ctx.req.formData();
  const users = JSON.parse(Deno.readTextFileSync("db/in-memory/users.json"));

  const { username, password } = extractUserInfo(formData);

  const user = users.find((user) => {
    return user.username === username;
  });

  if (user) {
    return ctx.text("username already taken");
  }

  users.push({ username, password });

  Deno.writeTextFileSync("db/in-memory/users.json", JSON.stringify(users));

  return ctx.redirect("/dashboard.html", 303);
};
