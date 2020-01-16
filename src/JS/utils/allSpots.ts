import axios from "axios";
import { Spot } from "../interfaces";

import { apiUrlLocations, spotsContainer } from "../constants";
import { templateSpotCard } from "../UI/SpotCard";

const fetchSpots = locationId => {
  axios(`${apiUrlLocations}/${locationId}`)
    .then(location => {
      spotsContainer.innerHTML += `<h2>Welcome To ${location.data.name}</h2>`;
      location.data.spots.forEach((spot: Spot) => {
        spotsContainer.innerHTML += templateSpotCard(spot);
      });
    })
    .catch(err => console.log(err));
};

export default fetchSpots;
