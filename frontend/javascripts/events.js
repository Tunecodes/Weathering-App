import eventHub from "./eventhub.js";
import { Theme } from "./theme.js";

const toggleTheme = document.querySelector("#toggle");

function getCurrentPage() {
  return localStorage.getItem("currentPage") || "home";
}

eventHub.subscribe("themeChange", (mode) => {
  const currentPage = getCurrentPage();
  if (currentPage === "home") {
    Theme.homePage(mode);
  }
  if (currentPage === "activity") {
    Theme.activityPage(mode);
  } else {
    Theme.suggestionPage(mode);
  }
});

toggleTheme.addEventListener("change", () => {
  eventHub.update("themeChange", toggleTheme.checked ? "dark" : "light");
});
