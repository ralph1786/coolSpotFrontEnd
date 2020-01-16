import "../style.css";
import "../createFormStyle.css";
import "../responsiveStyle.css";
import { animationFunc } from "./animation";
import {
  locationButton,
  createNewSpotButton,
  closeButton,
  formContainer,
  form,
  createFormContainer,
  modal,
  createFormCancelButton
} from "./constants";
import { closeNav, openNav } from "./navControls";
import {
  delegateLocationClick,
  delegateShowPageClick,
  delegateEditButton,
  delegateEditSubmitButton,
  delegateDeleteButton
} from "./delegations";
import createNewSpotFetch from "./utils/createSpot";

window.addEventListener("load", animationFunc);

function showCreateForm() {
  createFormContainer.style.display = "block";
}

locationButton.addEventListener("click", openNav);

closeButton.addEventListener("click", closeNav);

createNewSpotButton.addEventListener("click", showCreateForm);

delegateLocationClick();

delegateShowPageClick();

delegateEditButton();

delegateEditSubmitButton();

delegateDeleteButton();

//CREATE A NEW SPOT

const createButton = form["submit"];
createButton.addEventListener("click", e => {
  e.preventDefault();
  // console.log("it works");
  createNewSpotFetch();
  modal.style.display = "none";
});

// Get the modal

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

span.addEventListener("click", () => {
  modal.style.display = "none";
});

const closeModal = () => {
  modal.style.display = "none";
  formContainer.style.display = "none";
  createFormContainer.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", e => {
  if (
    e.target === modal ||
    e.target === formContainer ||
    e.target === createFormContainer
  ) {
    closeModal();
  }
});

//Close modal with cancel buttons
createFormCancelButton.addEventListener("click", closeModal);
