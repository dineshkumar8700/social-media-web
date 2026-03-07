const validateUser = (form, action) => {
  const formData = new FormData(form);
  return fetch(action, { method: "POST", body: formData })
    .then((res) => res.json());
};

const redirectToDashboard = () => {
  globalThis.location.replace("/dashboard");
};

const ERROR_MSG = {
  401: "Incorrect username or password",
  409: "Username already exists",
};

const attachListeners = (container) => {
  const form = container.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const action = form.getAttribute("action");

    validateUser(form, action)
      .then((res) => {
        if (res.hasError) {
          const errorArea = form.querySelector(".error-msg");
          errorArea.textContent = ERROR_MSG[res.errorCode];
          return;
        }
        redirectToDashboard();
      });
  });
};

globalThis.onload = () => {
  const section = document.querySelector("section");
  attachListeners(section);
};
