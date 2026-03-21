const createPostTemplate = (username, content) => {
  return {
    postId: 11,
    author: { name: username, username: `@${username}` },
    time_ago: "Just now",
    content,
    comments: 0,
    likes: 0,
  };
};

export const addPost = (content, username) => {
  if (!content) throw new Error("content can't be empty");
  if (!username) throw new Error("username required");

  const posts = JSON.parse(Deno.readTextFileSync("db/in-memory/posts.json"));

  const post = createPostTemplate(username, content);
  posts.unshift(post);
  console.log(post);

  return post;
};

export const getPosts = () =>
  JSON.parse(Deno.readTextFileSync("db/in-memory/posts.json"));
