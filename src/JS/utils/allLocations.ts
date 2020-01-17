import axios from "axios";

import {
  apiUrlLocations,
  spotsContainer,
  locationsContainer,
  locationOptions
} from "../constants";

import { Location } from "../interfaces";

function fetchAllLocations() {
  axios(apiUrlLocations)
    .then(locations => {
      spotsContainer.style.display = "grid";
      const h3 = document.createElement("h3");
      h3.appendChild(document.createTextNode("Please Choose A Location"));
      spotsContainer.appendChild(h3);
      locations.data.forEach((location: Location) => {
        // code below adds all locations to sideNav
        const li = document.createElement("li");
        li.classList.add("location");
        li.setAttribute("data-location-id", `${location.id}`);
        li.appendChild(document.createTextNode(location.name));
        locationsContainer.appendChild(li);

        //code below appends options to the select menu in the form to create new spots.
        const option = document.createElement("option");
        option.setAttribute("value", `${location.id}`);
        option.appendChild(document.createTextNode(location.name));
        locationOptions.appendChild(option);
      });
    })
    .catch(err => console.log(err));
}

export default fetchAllLocations;
