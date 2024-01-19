// import * as yup from "yup";

// export enum PropertyTypeEnum {
//   ROOM = "ROOM",
//   FLAT = "FLAT",
//   APARTMENT = "APARTMENT",
//   HOME = "HOME",
//   // LAND = "LAND",
// }

// interface ImageFile extends File {
//   preview: string; // Add a preview property if needed
// }

// const PropertyInfoSchema = yup.object({
//   property_name: yup
//     .string()
//     .typeError("Property Name Must be word")
//     .required("Property name is required"),

//   property_type: yup
//     .string()
//     .oneOf(Object.values(PropertyTypeEnum))
//     .required("Property type is required"),

//   bed: yup
//     .number()
//     .typeError("Should be a number")
//     .required("Bedrooms is required")
//     .min(0, "Bedrooms cannot be less than zero"),

//   old_price: yup
//     .number()
//     .typeError("Should be a number")
//     .optional()
//     .min(0, "Old price should not be less than zero"),

//   offered_price: yup
//     .number()
//     .typeError("Should be a number")
//     .required("Offered price is required.")
//     .min(0, "Offered price cannot be less than zero"),

//   property_description: yup
//     .string()
//     .typeError("Please write a few lines about your property")
//     .required("Please write a few lines about your property"),

//   property_images: yup
//     .array()
//     .min(1, "Please upload at least one picture")
//     .max(5, "You are not allowed to upload more than 5 pictures.")
//     .required("Please upload at least one picture"),

//   videos: yup
//     .array()
//     .nullable()
//     .of(
//       yup.object({
//         medium: yup.string().oneOf(["youtube", "tiktok"]),
//         media: yup
//           .string()
//           .nullable()
//           .test("medium", "", function (link = "") {
//             // ... (validation logic for videos)
//             return true;
//           }),
//       })
//     ),

//   address: yup
//     .object({
//       address: yup.string().required("Address is required."),
//       area: yup.string().required("Area is required."),
//       province: yup.string().required("Province is required."),
//       city: yup.string().required("City is required"),
//       land_mark: yup.string().required("Nearest Land Mark is required."),
//     })
//     .required("Address is Required"),
// });

// export default PropertyInfoSchema;

import * as yup from "yup";

const yourSchema = yup.object().shape({
  oldPrice: yup.number().required(),
  offeredPrice: yup
    .number()
    .test(
      "lessThanOldPrice",
      "Offered price should be less than old price",
      function (value) {
        const oldPrice = this.parent.oldPrice;
        return value < oldPrice;
      }
    ),
});

// Now, let's rename "offeredPrice" to "actualPrice"
const renamedSchema = yourSchema.transform((originalValue, originalObject) => {
  // Rename "offeredPrice" to "actualPrice"
  const { offeredPrice, ...rest } = originalObject;
  return { actualPrice: offeredPrice, ...rest };
});

// Now you can use the renamed schema
