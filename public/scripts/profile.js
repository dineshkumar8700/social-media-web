const fetchUserProfile = async () => {
  const profile = await fetch("/profile");
  return await profile.json();
};

const formatDate = (date) => {
  const monthsName = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  const [year, month] = date.split("-");
  return monthsName[month] + " " + year;
};

const renderProfilePage = (profile) => {
  const section = document.querySelector(".profile-info");
  section.querySelector(".profile-image img").src = profile.avatar;
  section.querySelector(".name").textContent = profile.name;
  section.querySelector(".user-name").textContent = profile.handle;
  section.querySelector(".joined-date span").textContent = formatDate(
    profile.joined,
  );
  section.querySelector(".following span").textContent = profile.following;
  section.querySelector(".followers span").textContent = profile.followers;
};

// deno-lint-ignore no-window
window.onload = async () => {
  const profile = await fetchUserProfile();
  renderProfilePage(profile);
};
