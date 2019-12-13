import { apiUrlSpots } from "./constants";

function deleteFetch(spotId) {
  fetch(`${apiUrlSpots}/${spotId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export default deleteFetch;
