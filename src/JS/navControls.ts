import {
  locationButton,
  createNewSpotButton,
  spotsContainer,
  locationsContainer
} from "./constants";
import fetchAllLocations from "./utils/allLocations";

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
export function openNav() {
  document.getElementById("mySidenav").style.width = "16%";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(231, 227, 227,0.2)";
  locationButton.style.display = "none";
  createNewSpotButton.style.display = "block";
  (document.querySelector(
    ".svg-morph-animation"
  ) as HTMLDivElement).style.display = "none";
  fetchAllLocations();
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
export function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
  spotsContainer.innerHTML = "";
  locationButton.style.display = "block";
  createNewSpotButton.style.display = "none";
  (document.querySelector(
    ".svg-morph-animation"
  ) as HTMLDivElement).style.display = "block";
  locationsContainer.innerHTML = "";
}
