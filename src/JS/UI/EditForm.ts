import { SpotInformation } from "../interfaces";

export const editFormTemplate = (spotInfo: SpotInformation) => {
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
