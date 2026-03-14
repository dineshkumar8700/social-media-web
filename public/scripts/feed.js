import { cls, createFragment, ELEMENTS } from "./dom.js";
const { ARTICLE, DIV, IMG, P, H4, FORM, TEXTAREA, BUTTON, SECTION } = ELEMENTS;

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

const addPostSubmitListener = (postModal) => {
  const container = document.querySelector("section");
  const form = postModal.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    form.reset();
    fetch("/add-post", { method: "post", body: formData })
      .then((res) => res.json())
      .then((post) => {
        displayPosts([post], container);
        postModal.remove();
      });
  });
};

const addPost = () => {
  const post = document.querySelector(".post-btn");
  post.addEventListener("click", () => {
    const postModal = createFragment([SECTION, { ...cls("post-modal") }, [
      BUTTON,
      { ...cls("close-modal-btn") },
      "X",
    ], [
      FORM,
      {
        ...cls("new-post-form"),
        method: "POST",
        action: "/add-post",
      },
      [DIV, {}, [
        TEXTAREA,
        {
          ...cls("post-content"),
          name: "content",
          id: "content",
          rows: 8,
          required: true,
          placeholder: "What's in your mind today...",
        },
      ]],
      [BUTTON, { type: "submit" }, "Post"],
    ]]);
    addPostSubmitListener(postModal);
    const body = document.querySelector("body");
    body.append(postModal);

    const closeBtn = document.querySelector(".close-modal-btn");
    closeBtn.addEventListener("click", () => {
      postModal.remove();
    });
  });
};

globalThis.onload = () => {
  const container = document.querySelector(".posts-container");
  fetchPosts()
    .then((posts) => displayPosts(posts, container));
  fetch("/user-info").then((res) => res.json()).then(({ username }) => {
    const usernamePlaceholder = document.querySelector(".username span");
    usernamePlaceholder.textContent = username;
  });
  addPost();
};
