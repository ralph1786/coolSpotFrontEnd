const validate = ({ name, address, review, image, location_id }) => {
  if (
    name.trim().length === 0 ||
    address.trim().length === 0 ||
    review.trim().length === 0 ||
    image.trim().length === 0 ||
    location_id.trim().length === 0
  ) {
    throw new Error("All Fields Required");
  }
};

export default validate;
