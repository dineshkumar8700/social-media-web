import { redirectUser } from "./utils.js";

const logout = () => {
  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", () => {
    fetch("/logout").then((_) => {
      redirectUser("/");
    });
  });
};

globalThis.onload = () => {
  logout();
};
