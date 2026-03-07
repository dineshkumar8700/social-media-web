import { validateUser } from "./auth.js";

const attachListeners = (container) => {
  const form = container.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const action = form.getAttribute("action");

    validateUser(form, action);
  });
};

globalThis.onload = () => {
  const section = document.querySelector("section");
  attachListeners(section);
};
