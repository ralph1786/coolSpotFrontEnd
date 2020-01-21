import axios from "axios";

import { Spot } from "../interfaces";
import { apiUrlSpots, spotsContainer, form } from "../constants";
import { templateSpotCard } from "../UI/SpotCard";
import validate from "../validation";

function createNewSpotFetch() {
  const selectLocation = document.querySelector(
    ".location-options"
  ) as HTMLSelectElement;
  const createFormModal = document.querySelector(
    ".create-form-container"
  ) as HTMLDivElement;
  const locationId = selectLocation.value;

  const spotInfo = {
    name: form["spot-name"].value,
    address: form["spot-address"].value,
    image: form["spot-image"].value,
    review: form["spot-review"].value,
    location_id: locationId
  };

  validate(spotInfo);
  axios
    .post(`${apiUrlSpots}`, spotInfo)
    .then((spot: { data: Spot }) => {
      // console.log(spot);
      spotsContainer.innerHTML += templateSpotCard(spot.data);
      createFormModal.style.display = "none";
    })
    .catch((err: any) => console.log(err));
}

export default createNewSpotFetch;
