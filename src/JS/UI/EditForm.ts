import { SpotInformation } from "../interfaces";
import "../../form.css";

export const editFormTemplate = (spotInfo: SpotInformation) => {
  return `
  <form data-spot-id="${spotInfo.id}" class="edit-form">
      <div>
      <h3>Edit Your Review</h3>
      <label for="review">Review:</label>
      <input type="text" id="quote-edit" value="${spotInfo.review}" name="review">
      </div>
      <button type="submit" class="edit-submit">Submit</button>
  </form>
  <button class="edit-cancel">Cancel</button>
  `;
};
