export const serveProfile = (context) => {
  const profiles = Deno.readTextFileSync("db/in-memory/profile.json");
  return context.json(JSON.parse(profiles)[0]);
};
