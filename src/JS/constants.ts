export const apiUrlLocations: string = "http://localhost:3000/api/v1/locations";
export const apiUrlSpots: string = "http://localhost:3000/api/v1/spots";
export const locationsContainer = document.querySelector(
  ".list-locations"
) as HTMLUListElement;
export const spotsContainer = document.querySelector("#main") as HTMLDivElement;
export const locationButton = document.querySelector(
  ".location-button"
) as HTMLButtonElement;
export const formContainer = document.querySelector(
  ".form-container"
) as HTMLDivElement;
export const formContent = document.querySelector(
  ".form-content"
) as HTMLDivElement;
export const createNewSpotButton = document.querySelector(
  ".create-new-spot-button"
) as HTMLButtonElement;
export const createFormContainer = document.querySelector(
  ".create-form-container"
) as HTMLDivElement;
export const closeButton = document.querySelector(
  ".close-btn"
) as HTMLButtonElement;

export const form = document.querySelector(".create-form") as HTMLFormElement;

export const modal = document.getElementById("myModal") as HTMLDivElement;

export const createFormCancelButton = document.querySelector(
  ".cancel-button"
) as HTMLButtonElement;
