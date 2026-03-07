import { redirectUser } from "./utils.js";

const ERROR_MSG = {
  401: "Incorrect username or password",
  409: "Username already exists",
};

export const validateUser = (form, action) => {
  const formData = new FormData(form);
  return fetch(action, { method: "POST", body: formData })
    .then((res) => res.json())
    .then((res) => {
      if (res.hasError) {
        const errorArea = form.querySelector(".error-msg");
        errorArea.textContent = ERROR_MSG[res.errorCode];
        return;
      }
      redirectUser("/feed");
    });
};
