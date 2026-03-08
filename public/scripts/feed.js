import { cls, createFragment, ELEMENTS } from "./dom.js";
const { ARTICLE, DIV, IMG, P, H4, FORM, LABEL, TEXTAREA, BUTTON } = ELEMENTS;

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

  container.prepend(...fragments);
};

const fetchPosts = () => {
  return fetch("/posts").then((posts) => posts.json());
};

const addPostSubmitListener = (form) => {
  const container = document.querySelector("section");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    fetch("/add-post", { method: "post", body: formData })
      .then((res) => res.json())
      .then((post) => displayPosts([post], container));
  });
};

const addPost = () => {
  const post = document.querySelector(".post-btn");
  post.addEventListener("click", (e) => {
    const postForm = createFragment([FORM, {
      ...cls("new-post-form"),
      method: "POST",
      action: "/add-post",
    }, [DIV, {}, [LABEL, { for: "content" }, "Content:"], [
      TEXTAREA,
      { ...cls("post-content"), name: "content", id: "content" },
    ]], [BUTTON, { type: "submit" }, "Post"]]);
    addPostSubmitListener(postForm);
    const body = document.querySelector("body");
    body.append(postForm);
  });
};

globalThis.onload = () => {
  const container = document.querySelector(".posts-container");
  fetchPosts()
    .then((posts) => displayPosts(posts, container));

  addPost();
};
