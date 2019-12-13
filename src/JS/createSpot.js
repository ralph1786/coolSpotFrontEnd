import { apiUrlSpots, spotsContainer } from "./constants";
import { templateSpotCard } from "./templates";

function createNewSpotFetch() {
  const selectLocation = document.querySelector(".location-options");
  const createFormModal = document.querySelector(".create-form-container");
  const locationId = selectLocation.value;
  const spotInfo = {
    name: form["spot-name"].value,
    address: form["spot-address"].value,
    image: form["image-url"].value,
    review: form["spot-review"].value,
    location_id: locationId
  };
  // debugger;
  fetch(`${apiUrlSpots}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spotInfo)
  })
    .then(res => res.json())
    .then(spot => {
      // console.log(spot);
      spotsContainer.innerHTML += templateSpotCard(spot);
      createFormModal.style.display = "none";
    })
    .catch(err => console.log(err));
}

export default createNewSpotFetch;
