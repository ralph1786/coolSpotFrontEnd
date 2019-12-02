import "../style.css";
import "../createFormStyle.css";
import "../responsiveStyle.css";
import { animationFunc } from "./animation";
import {
  templateSpotCard,
  createLocationTemplate,
  editFormTemplate
} from "./templates";

window.addEventListener("load", animationFunc);

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = "20%";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(231, 227, 227,0.2)";
  locationButton.style.display = "none";
  createNewSpotButton.style.display = "block";
  document.querySelector(".svg-morph-animation").style.display = "none";
  fetchAllLocations();
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
  spotsContainer.innerHTML = "";
  locationButton.style.display = "block";
  createNewSpotButton.style.display = "none";
  document.querySelector(".svg-morph-animation").style.display = "block";
  locationsContainer.innerHTML = "";
}

const apiUrlLocations = "http://localhost:3000/api/v1/locations";
const apiUrlSpots = "http://localhost:3000/api/v1/spots";
const locationsContainer = document.querySelector(".list-locations");
const spotsContainer = document.querySelector("#main");
const locationButton = document.querySelector(".location-button");
const formContainer = document.querySelector(".form-container");
const formContent = document.querySelector(".form-content");
const createNewSpotButton = document.querySelector(".create-new-spot-button");
const createFormContainer = document.querySelector(".create-form-container");
const closeButton = document.querySelector(".close-btn");

function showCreateForm() {
  createFormContainer.style.display = "block";
}

locationButton.addEventListener("click", openNav);

closeButton.addEventListener("click", closeNav);

createNewSpotButton.addEventListener("click", showCreateForm);

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

function delegateLocationClick() {
  locationsContainer.addEventListener("click", e => {
    if (e.target.className === "location") {
      //   console.log(e.target.dataset.locationId);
      let locationId = e.target.dataset.locationId;
      main.innerHTML = "";
      fetchSpots(locationId);
    }
  });
}

delegateLocationClick();

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

//CODE BELOW FOR MODAL SHOW PAGE

const imageModal = document.querySelector(".image-modal");
const nameModal = document.querySelector(".name-modal");
const addressModal = document.querySelector(".address-modal");
const reviewModal = document.querySelector(".review-modal");

function delegateShowPageClick() {
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
      // const spotId = e.target.dataset.spotId;
      modal.style.display = "block";
      // console.log(spotId);
    }
  });
}

delegateShowPageClick();
//END OF SHOW PAGE CODE

// EDIT BUTTON DELEGATION, FETCH(PATCH)

function delegateEditButton() {
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
delegateEditButton();

function delegateEditSubmitButton() {
  formContent.addEventListener("submit", e => {
    e.preventDefault();
    // console.log(e.target);
    const formInfo = {
      id: e.target.dataset.spotId,
      review: e.target["review"].value
    };
    makeUpdateFetch(formInfo);
  });
}

delegateEditSubmitButton();

function makeUpdateFetch(formInfo) {
  fetch(`${apiUrlSpots}/${formInfo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formInfo)
  })
    .then(res => res.json())
    .then(spotInfo => {
      formContainer.style.display = "none";
      // console.log(spotInfo);
      reviewModal.innerText = spotInfo.review;
      // debugger;
    });
}
//END OF UPDATE

//DELETE FUNCTIONALITY

function delegateDeleteButton() {
  spotsContainer.addEventListener("click", e => {
    if (e.target.className === "js-delete") {
      const spotId = e.target.dataset.spotId;
      // debugger;
      deleteFetch(spotId);
      e.target.parentNode.parentNode.remove();
    }
  });
}

delegateDeleteButton();

function deleteFetch(spotId) {
  fetch(`${apiUrlSpots}/${spotId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
}
//END OF DELETE FUNCTIONALITY

//CREATE A NEW SPOT

const form = document.querySelector(".create-form");
const selectLocation = document.querySelector(".location-options");
const createButton = form["submit"];
const createFormModal = document.querySelector(".create-form-container");

function createNewSpotFetch() {
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

createButton.addEventListener("click", e => {
  e.preventDefault();
  // console.log("it works");
  createNewSpotFetch();
  modal.style.display = "none";
});

//MODAL CODE BELOW

// Get the modal
const modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = e => {
  if (
    e.target === modal ||
    e.target === formContainer ||
    e.target === createFormContainer
  ) {
    modal.style.display = "none";
    formContainer.style.display = "none";
    createFormContainer.style.display = "none";
  }
};
