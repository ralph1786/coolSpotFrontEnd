import axios from "axios";

import { apiUrlSpots } from "../constants";

function deleteFetch(spotId) {
  axios.delete(`${apiUrlSpots}/${spotId}`);
}

export default deleteFetch;
