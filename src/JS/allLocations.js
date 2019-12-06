import {
  apiUrlLocations,
  spotsContainer,
  locationsContainer
} from "./constants";

function fetchAllLocations() {
  fetch(apiUrlLocations)
    .then(res => res.json())
    .then(locations => {
      spotsContainer.style.display = "grid";
      const h2 = document.createElement("h2");
      h2.appendChild(document.createTextNode("Please Choose A Location"));
      // spotsContainer.innerHTML += `<h2>Please Choose A Location</h2>`;
      spotsContainer.appendChild(h2);
      locations.forEach(location => {
        // console.log(location);
        // locationsContainer.innerHTML += createLocationTemplate(location);
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
