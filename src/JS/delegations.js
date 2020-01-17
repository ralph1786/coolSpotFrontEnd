import {
  locationsContainer,
  spotsContainer,
  modal,
  formContent,
  formContainer
} from "./constants";
import fetchSpots from "./utils/allSpots";
import deleteFetch from "./utils/deleteSpot";
import { editFormTemplate } from "./UI/EditForm";
import makeUpdateFetch from "./utils/updateSpot";
import createLocation from "./utils/createLocation";

import validate from "./validation";

export function delegateLocationClick() {
  locationsContainer.addEventListener("click", e => {
    if (e.target.className === "location") {
      //   console.log(e.target.dataset.locationId);
      let locationId = e.target.dataset.locationId;
      main.innerHTML = "";
      fetchSpots(locationId);
    }
  });
}

export function delegateShowPageClick() {
  const imageModal = document.querySelector(".image-modal");
  const nameModal = document.querySelector(".name-modal");
  const addressModal = document.querySelector(".address-modal");
  const reviewModal = document.querySelector(".review-modal");
  spotsContainer.addEventListener("click", e => {
    if (
      e.target.className === "card" ||
      e.target.className === "container" ||
      e.target.className === "image"
    ) {
      if (e.target.className === "image") {
        const spotId = e.target.dataset.spotId;
        const imgSrc = e.target.currentSrc;
        // console.dir(e.target);
        nameModal.innerText = document.querySelector(
          `.name[data-spot-id="${spotId}"]`
        ).innerText;
        addressModal.innerText = document.querySelector(
          `.address[data-spot-id="${spotId}"]`
        ).innerText;
        reviewModal.innerText = document.querySelector(
          `.review[data-spot-id="${spotId}"]`
        ).innerText;
        imageModal.setAttribute("src", imgSrc);
      } else if (e.target.className === "container") {
        const imgSrc = e.target.previousElementSibling.currentSrc;
        imageModal.setAttribute("src", imgSrc);
        const spotId = e.target.dataset.spotId;
        // console.dir(e.target);
        nameModal.innerText = document.querySelector(
          `.name[data-spot-id="${spotId}"]`
        ).innerText;
        addressModal.innerText = document.querySelector(
          `.address[data-spot-id="${spotId}"]`
        ).innerText;
        reviewModal.innerText = document.querySelector(
          `.review[data-spot-id="${spotId}"]`
        ).innerText;
      }

      modal.style.display = "block";
    }
  });
}

export function delegateEditButton() {
  spotsContainer.addEventListener("click", e => {
    if (e.target.className === "js-edit") {
      const spotId = e.target.dataset.spotId;
      const spotInfo = {
        id: e.target.dataset.spotId,
        name: document.querySelector(`.name[data-spot-id="${spotId}"]`)
          .innerText,
        address: document.querySelector(`.address[data-spot-id="${spotId}"]`)
          .innerText,
        review: document.querySelector(`.review[data-spot-id="${spotId}"]`)
          .innerText
      };
      // console.log(spotInfo);
      formContainer.style.display = "block";
      formContent.innerHTML = editFormTemplate(spotInfo);
    }
  });
}

export function delegateEditSubmitButton() {
  formContent.addEventListener("submit", e => {
    e.preventDefault();
    const formInfo = {
      id: e.target.dataset.spotId,
      review: e.target["review"].value
    };
    makeUpdateFetch(formInfo);
  });
  formContent.addEventListener("click", e => {
    console.log("clicked");
    if (
      e.target.className === "edit-cancel" ||
      e.target.className === "location-create-cancel"
    ) {
      formContainer.style.display = "none";
    }
  });
}

export function delegateLocationCreateSubmitButton() {
  formContent.addEventListener("submit", e => {
    e.preventDefault();
    const locationInfo = {
      name: e.target["name"].value
    };
    validate(locationInfo);
    createLocation(locationInfo);
  });
}

export function delegateDeleteButton() {
  spotsContainer.addEventListener("click", e => {
    if (e.target.className === "js-delete") {
      const spotId = e.target.dataset.spotId;
      deleteFetch(spotId);
      e.target.parentNode.parentNode.remove();
    }
  });
}
