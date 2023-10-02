const darkTheme = (getDarkThemes) => {
  localStorage.setItem("themes", "dark");  

  document.getElementById("sidenav").classList.add("dark");
  document.getElementById("_sidenavbar-header").classList.add("dark");
  document.querySelectorAll("p").forEach((values) => {
    values.classList.add("dark");
  });
  document.querySelectorAll("button").forEach((values) => {
    values.classList.add("dark");
  });
  document.getElementById("_topnavbar").classList.add("dark");
  document.querySelectorAll("a").forEach((values) => {
    values.classList.add("dark");
  });
  document.querySelectorAll("i").forEach((values) => {
    values.classList.add("dark");
  });
  document.querySelectorAll("h1").forEach((element) => {
    element.classList.add("dark");
  });
  document.querySelectorAll("h2").forEach((element) => {
    element.classList.add("dark");
  });
  document.querySelectorAll("h3").forEach((element) => {
    element.classList.add("dark");
  });
  document.querySelectorAll("label").forEach((element) => {
    element.classList.add("dark");
  });
  document.querySelector(".content").classList.add("dark");
  document.getElementById("_bookshelf-content-form").classList.add("dark");
  document.getElementById("reads").classList.add("dark");
  document.getElementById("unreads").classList.add("dark");
  document.querySelectorAll(".read-box").forEach((element) => {
    element.classList.add("dark");
  });
};

const lightTheme = () => {
  localStorage.setItem("themes", "");

  document.getElementById("sidenav").classList.remove("dark");
  document.getElementById("_sidenavbar-header").classList.remove("dark");
  document.querySelectorAll("p").forEach((values) => {
    values.classList.remove("dark");
  });
  document.querySelectorAll("button").forEach((values) => {
    values.classList.remove("dark");
  });
  document.getElementById("_topnavbar").classList.remove("dark");
  document.querySelectorAll("a").forEach((values) => {
    values.classList.remove("dark");
  });
  document.querySelectorAll("i").forEach((values) => {
    values.classList.remove("dark");
  });
  document.querySelectorAll("h1").forEach((element) => {
    element.classList.remove("dark");
  });
  document.querySelectorAll("h2").forEach((element) => {
    element.classList.remove("dark");
  });
  document.querySelectorAll("h3").forEach((element) => {
    element.classList.remove("dark");
  });
  document.querySelectorAll("label").forEach((element) => {
    element.classList.remove("dark");
  });
  document.querySelector(".content").classList.remove("dark");
  document.getElementById("_bookshelf-content-form").classList.remove("dark");
  document.getElementById("reads").classList.remove("dark");
  document.getElementById("unreads").classList.remove("dark");
  document.querySelectorAll(".read-box").forEach((element) => {
    element.classList.remove("dark");
  });
};
