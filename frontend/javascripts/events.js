import eventHub from "./eventhub.js"
import { Theme } from "./theme.js";

const toggleTheme = document.querySelector("#toggle");

eventHub.subscribe("themeChange", (mode) => {
    Theme.homePage(mode)
});

toggleTheme.addEventListener("change", () => {
  eventHub.update("themeChange", toggleTheme.checked ? "dark" : "light");
});

