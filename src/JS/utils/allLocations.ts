import axios from "axios";

import {
  apiUrlLocations,
  spotsContainer,
  locationsContainer
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
        const li = document.createElement("li");
        li.classList.add("location");
        li.setAttribute("data-location-id", `${location.id}`);
        li.appendChild(document.createTextNode(location.name));
        locationsContainer.appendChild(li);
      });
    })
    .catch(err => console.log(err));
}

export default fetchAllLocations;
