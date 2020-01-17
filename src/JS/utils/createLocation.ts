import axios from "axios";

import { apiUrlLocations, locationsContainer } from "../constants";

import { Location } from "../interfaces";

function createLocation<T extends Location>(locationInfo: T) {
  axios
    .post(apiUrlLocations, locationInfo)
    .then((location: { data: Location }) => {
      const li = document.createElement("li");
      li.classList.add("location");
      li.setAttribute("data-location-id", `${location.data.id}`);
      li.appendChild(document.createTextNode(location.data.name));
      locationsContainer.appendChild(li);
    })
    .catch(err => console.log(err));
}

export default createLocation;
