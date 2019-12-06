import { apiUrlLocations, spotsContainer } from "./constants";
import { templateSpotCard } from "./templates";

const fetchSpots = locationId => {
  fetch(`${apiUrlLocations}/${locationId}`)
    .then(res => res.json())
    .then(location => {
      // console.log(location.spots)
      spotsContainer.innerHTML += `<h1>Welcome To ${location.name}</h1>`;
      location.spots.forEach(spot => {
        spotsContainer.innerHTML += templateSpotCard(spot);
      });
    })
    .catch(err => console.log(err));
};

export default fetchSpots;
