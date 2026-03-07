const logout = () => {
  const logoutBtn = document.querySelector(".logout-btn");
  logoutBtn.addEventListener("click", () => {
    alert("hoo");
    console.log("Logout clicked");

    fetch("/logout").then((_) => {
      globalThis.location.replace("/");
    });
  });
};

globalThis.onload = () => {
  logout();
};
