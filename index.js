/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(231, 227, 227,0.2)";
  locationButton.style.display = "none";
  createNewSpotButton.style.display = "block";
  document.querySelector(".svg-morph-animation").style.display = "none";
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
}

const apiUrl = "http://localhost:3000/api/v1/locations";
const locationsContainer = document.querySelector(".list-locations");
const spotsContainer = document.querySelector("#main");
const locationButton = document.querySelector(".location-button");
const formContainer = document.querySelector(".form-container");
const formContent = document.querySelector(".form-content");
const createNewSpotButton = document.querySelector(".create-new-spot-button");
const createFormContainer = document.querySelector(".create-form-container");

function showCreateForm() {
  createFormContainer.style.display = "block";
}

createNewSpotButton.addEventListener("click", showCreateForm);

function createLocationTemplate(location) {
  return `
    <ul>
    <li class="location"
    data-location-id="${location.id}">${location.name}</li>
    </ul>  
    `;
}

function fetchAllLocations() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(locations =>
      locations.forEach(location => {
        // console.log(location);
        locationsContainer.innerHTML += createLocationTemplate(location);
      })
    );
}

fetchAllLocations();

const templateSpotCard = spot => {
  return `
    <div class="card" data-spot-id="${spot.id}">
    <img src="${spot.image}" alt="Avatar" class="image" data-spot-id="${
    spot.id
  }">
    <div class="container" data-spot-id="${spot.id}">
        <h4 data-spot-id="${spot.id}" class="name">${spot.name}</h4> 
        <p data-spot-id="${spot.id}" class="address">${spot.address}</p>
        <p class="review" data-spot-id="${spot.id}">${spot.review}</p>
        <button class="js-edit" data-spot-id="${spot.id}">Edit</button>
        <button class="js-delete" data-spot-id="${spot.id}">Delete</button> 
    </div>
    </div>
    `;
};

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
  fetch(`${apiUrl}/${locationId}`)
    .then(res => res.json())
    .then(location => {
      // console.log(location.spots)
      location.spots.forEach(spot => {
        spotsContainer.innerHTML += templateSpotCard(spot);
      });
    });
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
        // console.log(
        //   document.querySelector(`.review[data-spot-id="${spotId}"]`)
        // );
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

//EDIT FORM, EDIT BUTTON DELEGATION, FETCH(PATCH)

const editFormTemplate = spotInfo => {
  return `
  <form data-spot-id="${spotInfo.id}" class="edit-form">
      <div>
      <h4>Edit Your Review</h4>
      <label>Review</label>
      <input type="text" id="quote-edit" value="${
        spotInfo.review
      }" name="review">
      </div>
      <button type="submit" class="edit-submit">Submit</button>
  </form>
  `;
};

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

    // console.log(formInfo);
    makeUpdateFetch(formInfo);
  });
}

delegateEditSubmitButton();

function makeUpdateFetch(formInfo) {
  fetch(`${apiUrl}/${formInfo.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formInfo)
  })
    .then(res => res.json())
    .then(spot => console.log(spot));
}

//CREATE A NEW SPOT

const form = document.querySelector(".create-form");
const selectLocation = document.querySelector(".location-options");
// console.log(form["spot-name"].value);
// console.log(selectLocation.value);
const createButton = form["submit"];

function createNewSpotFetch() {
  const locationId = selectLocation.value;
  const spotInfo = {
    name: form["spot-name"].value,
    address: form["spot-address"].value,
    image: form["image-url"].value,
    review: form["spot-review"].value
  };
  fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spotInfo)
  })
    .then(res => res.json())
    .then(spot => {
      console.log(spot);
    });
}

createButton.addEventListener("click", e => {
  e.preventDefault();
  // console.log("it works");
  createNewSpotFetch();
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
window.onclick = function(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  } else if (e.target == formContainer) {
    formContainer.style.display = "none";
  } else if (e.target == createFormContainer) {
    createFormContainer.style.display = "none";
  }
};
