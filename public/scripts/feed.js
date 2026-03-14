const sendRequest = (url, method, body) =>
  fetch(url, { method, body }).then((res) => res.json());

const postSubmit = (postModal) => {
  const postsContainer = document.querySelector(".posts-container");
  const form = postModal.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    form.reset();
    sendRequest("/add-post", "POST", formData)
      .then((post) => {
        const template = createPostTemplate(post);
        postsContainer.prepend(template);
        postModal.remove();
      });
  });
};

const createPostTemplate = (post) => {
  const postTemplate = document.querySelector(".post-template");
  const template = postTemplate.content.cloneNode(true);
  const img = template.querySelector(".user-avatar img");

  img.setAttribute("src", "/images/user-avatar.png");
  template.querySelector(".post-time").textContent = post.time_ago;
  template.querySelector(".user-detail h4").textContent = post.author.name;
  template.querySelector(".user-detail p").textContent = post.author.username;
  template.querySelector(".post-content").textContent = post.content;
  template.querySelector(".comments span").textContent = post.comments;
  template.querySelector(".likes span").textContent = post.likes;

  return template;
};

const modalClose = (modal) => {
  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });
};

const openPostModal = () => {
  const template = document.querySelector("#new-post-template");
  const clone = template.content.cloneNode(true);
  const modal = clone.querySelector(".post-modal");
  const body = document.querySelector("body");
  body.append(clone);

  return modal;
};

const attachNewPostListener = () => {
  const addPostBtn = document.querySelector(".post-btn");

  addPostBtn.addEventListener("click", () => {
    const modal = openPostModal();
    postSubmit(modal);
    modalClose(modal);
  });
};

const showUserName = () => {
  sendRequest("/user-info", "GET")
    .then(({ username }) => {
      const usernamePlaceholder = document.querySelector(".username span");
      usernamePlaceholder.textContent = username;
    });
};

const displayPosts = (container) => {
  sendRequest("/posts", "GET")
    .then((posts) => {
      const postTemplates = posts.map(createPostTemplate);
      container.prepend(...postTemplates);
    });
};

globalThis.onload = () => {
  const container = document.querySelector(".posts-container");
  displayPosts(container);
  showUserName();
  attachNewPostListener();
};
