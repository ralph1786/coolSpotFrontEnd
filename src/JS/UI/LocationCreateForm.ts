import "../../form.css";

export function LocationCreateForm() {
  return `
    <h2>Add New Location</h2>
      <form class="location-create-form">
        <label for="name">Location Name:</label>
        <input type="text" class="location-create-form-name" name="name" />
        <button type="submit" class="location-create-btn">Create</button>
      </form>
    <button class="location-create-cancel">Cancel</button>
    `;
}
