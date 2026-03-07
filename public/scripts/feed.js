import { cls, createFragment, ELEMENTS } from "./dom.js";

const { ARTICLE, DIV, IMG, P, H4 } = ELEMENTS;

const displayPosts = (posts, container) => {
  const fragments = posts.map((post) => {
    const fragment = createFragment([
      ARTICLE,
      {},
      [DIV, { ...cls("user-avatar") }, [IMG, {
        src: "/images/user-avatar.png",
        alt: "user avatar",
        ...cls("user-avatar"),
      }, ""]],
      [
        DIV,
        { class: "post-details" },
        [DIV, { ...cls("user-detail") }, [
          H4,
          {},
          post.author.name,
        ], [P, {}, post.author.username]],
        [P, { class: "post-time" }, post.time_ago],
        [P, { class: "post-content" }, post.content],
        [DIV, { class: "post-impressions" }, [
          P,
          { class: "comments" },
          `Comments: ${post.comments}`,
        ], [
          P,
          { class: "likes" },
          `Likes: ${post.likes}`,
        ]],
      ],
    ]);
    return fragment;
  });

  container.append(...fragments);
};

const fetchPosts = () => {
  return fetch("/posts").then((posts) => posts.json());
};

globalThis.onload = () => {
  const container = document.querySelector(".posts-container");
  fetchPosts()
    .then((posts) => displayPosts(posts, container));

  logout();
};
