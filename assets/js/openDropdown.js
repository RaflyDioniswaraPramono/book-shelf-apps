const openDropdownDashboard = () => {
  const icon = document.getElementById("icon-dashboard");
  icon.classList.toggle("show");

  const dashboardBox = document.getElementById("dashboard-box");

  if (icon.classList.contains("show")) {
    icon.classList.add("fa-caret-down");
    icon.classList.remove("fa-caret-right");
    dashboardBox.classList.add("show");
  } else {
    icon.classList.add("fa-caret-right");
    icon.classList.remove("fa-caret-down");
    dashboardBox.classList.remove("show");
  }
};

const openDropdownTheme = () => {
  const icon = document.getElementById("icon-theme");
  icon.classList.toggle("show");

  const themeBox = document.getElementById("theme-box");

  if (icon.classList.contains("show")) {
    icon.classList.add("fa-caret-down");
    icon.classList.remove("fa-caret-right");
    themeBox.classList.add("show");
  } else {
    icon.classList.add("fa-caret-right");
    icon.classList.remove("fa-caret-down");
    themeBox.classList.remove("show");
  }
};
