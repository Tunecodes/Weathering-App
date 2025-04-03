export class Theme {
  static homePage(mode) {
    const container = document.querySelector(".container");
    const foreCast = document.querySelectorAll(".seven-days > div");
    const todayCons = document.querySelectorAll(".tody-con > div");
    const sideBar = document.querySelector(".sidebar");
    const todayCon = document.querySelector(".tody-con");
    const airCon = document.querySelector("#aircondition");
    const alertCon = document.querySelector("#alert");
    const searchRecom = document.querySelector(".result-box > ul");
    const search = document.querySelector(".row");
    const city = document.querySelector("#location > h2");
    const time = document.querySelector("#location > p");

    const allElements = document.querySelectorAll("*");

    const tempCon = document.querySelector("#temperature");

    if (mode === "dark") {
      container.style.backgroundColor = "rgb(18,18,18)";
      backgroundChange("rgb(41,41,41)");
      allElements.forEach(
        (element) => (element.style.color = "rgb(155,155,155)")
      );
      todayCons.forEach(
        (con) => (con.style.border = "rgb(18,18,18) dotted 3px")
      );
      const style = document.createElement("style");

      style.innerHTML = `
      ::placeholder {
        color: rgb(155,155,155);
      }`;
      document.head.appendChild(style);
    } else {
      container.style.backgroundColor = "white";
      backgroundChange("rgb(204, 204, 204)");
      allElements.forEach((element) => (element.style.color = "white"));
      todayCons.forEach((con) => (con.style.border = "white dotted 3px"));
      city.style.color = "rgb(204, 204, 204)";
      time.style.color = "rgb(204, 204, 204)";

      const style = document.createElement("style");

      style.innerHTML = `
      ::placeholder {
        color: white;
      }`;
      document.head.appendChild(style);
    }

    function backgroundChange(color) {
      foreCast.forEach((day) => (day.style.backgroundColor = color));
      sideBar.style.backgroundColor = color;
      tempCon.style.backgroundColor = color;
      todayCon.style.backgroundColor = color;
      airCon.style.backgroundColor = color;
      alertCon.style.backgroundColor = color;
      search.style.backgroundColor = color;
      searchRecom.style.backgroundColor = color;
    }
  }

  static activityPage(mode) {
    const sideBar = document.querySelector(".sidebar");
    const activities = document.querySelectorAll(".activity");
    const allElements = document.querySelectorAll("*");
    const container = document.querySelector(".container");

    if (mode === "dark") {
      container.style.backgroundColor = "rgb(18,18,18)";
      sideBar.style.backgroundColor = "rgb(41,41,41)";
      activities.forEach((activity) => {
        activity.style.backgroundColor = "rgb(41,41,41)";
        activity.style.border = "rgb(18,18,18) solid 1px";
      });
      allElements.forEach(
        (element) => (element.style.color = "rgb(155,155,155)")
      );
    } else {
      container.style.backgroundColor = "white";
      sideBar.style.backgroundColor = "rgb(204, 204, 204)";
      activities.forEach((activity) => {
        activity.style.backgroundColor = "rgb(204, 204, 204)";
        activity.style.border = "white solid 1px";
      });
      allElements.forEach((element) => (element.style.color = "white"));
    }
  }

  static suggestionPage(mode) {
    const sideBar = document.querySelector(".sidebar");
    const activities = document.querySelectorAll(".suggestion");
    const allElements = document.querySelectorAll("*");
    const container = document.querySelector(".container");

    if (mode === "dark") {
      container.style.backgroundColor = "rgb(18,18,18)";
      sideBar.style.backgroundColor = "rgb(41,41,41)";
      activities.forEach((activity) => {
        activity.style.backgroundColor = "rgb(41,41,41)";
        activity.style.border = "rgb(18,18,18) solid 1px";
      });
      allElements.forEach(
        (element) => (element.style.color = "rgb(155,155,155)")
      );
    } else {
      container.style.backgroundColor = "white";
      sideBar.style.backgroundColor = "rgb(204, 204, 204)";
      activities.forEach((activity) => {
        activity.style.backgroundColor = "rgb(204, 204, 204)";
        activity.style.border = "white solid 1px";
      });
      allElements.forEach((element) => (element.style.color = "white"));
    }
  }
}
