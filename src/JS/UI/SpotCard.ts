import { Spot } from "../interfaces";
import "./SpotCard.css";

export const templateSpotCard = <T extends Spot>(spot: T) => {
  return `
    <div class="card animated fadeIn" data-spot-id="${spot.id}">
    <img src="${spot.image}" alt="Avatar" class="image" data-spot-id="${spot.id}">
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
