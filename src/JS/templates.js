// export const createLocationTemplate = location => {
//   return `
//     <li class="location"
//     data-location-id="${location.id}">${location.name}</li>
//     `;
// };

// export const createLocationTemplate = location => {
//   const li = document.createElement("li");
//   li.classList.add("location");
//   li.setAttribute("data-location-id", `${location.id}`);
//   li.appendChild(document.createTextNode(location.name));
// };

export const templateSpotCard = spot => {
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

export const editFormTemplate = spotInfo => {
  return `
  <form data-spot-id="${spotInfo.id}" class="edit-form">
      <div>
      <h4>Edit Your Review</h4>
      <label>Review</label>
      <input type="text" id="quote-edit" value="${spotInfo.review}" name="review">
      </div>
      <button type="submit" class="edit-submit">Submit</button>
  </form>
  `;
};
