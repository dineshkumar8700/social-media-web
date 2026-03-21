export const login = (username, password) => {
  const users = JSON.parse(Deno.readTextFileSync("db/in-memory/users.json"));
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) throw new Error("unauthoried");

  return "success";
};

export const signup = (username, password) => {
  const users = JSON.parse(Deno.readTextFileSync("db/in-memory/users.json"));
  const user = users.find((user) => user.username === username);

  if (user) throw new Error("username already taken");

  users.push({ username, password });
  Deno.writeTextFileSync(
    "db/in-memory/users.json",
    JSON.stringify(users, null, 2),
  );

  return "success";
};
