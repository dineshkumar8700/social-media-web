const validateUser = (form) => {
  const formData = new FormData(form);
  return fetch("/login", { method: "POST", body: formData }).then((res) =>
    res.json()
  );
};

const showDashboard = () => {
  globalThis.location.replace("/dashboard");
};

const attachListeners = (container) => {
  const form = container.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateUser(form).then((res) => {
      if (res.hasError) {
        const errorArea = form.querySelector(".error-msg");
        errorArea.textContent = "Incorrect username or password";
        return;
      }
      showDashboard();
    });
  });
};

globalThis.onload = () => {
  const section = document.querySelector("section");
  attachListeners(section);
};
