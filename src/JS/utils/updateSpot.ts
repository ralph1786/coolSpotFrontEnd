import axios from "axios";

import { apiUrlSpots, formContainer } from "../constants";

function makeUpdateFetch(formInfo) {
  const reviewModal = document.querySelector(
    ".review-modal"
  ) as HTMLParagraphElement;
  reviewModal.textContent = formInfo.review;
  // debugger;
  axios.patch(`${apiUrlSpots}/${formInfo.id}`, formInfo).then(spotInfo => {
    console.log(spotInfo);
    formContainer.style.display = "none";
    // console.log(spotInfo);
    // reviewModal.innerText = spotInfo.data.review;
    // debugger;
  });
}

export default makeUpdateFetch;
