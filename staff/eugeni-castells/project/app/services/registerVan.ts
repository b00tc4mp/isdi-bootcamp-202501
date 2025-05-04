import { validate } from "@/com";
import { RegisterVanParam } from "./types";
import { errors } from "@/com";
import { data } from "@/data";

const { SystemError } = errors;

export const registerVan = (vanInfo: RegisterVanParam) => {
  const {
    model,
    brand,
    features: { airConditioning, fridge, heating, insideKitchen },
    traits: { accessible, bedCount, doors, maxTravellers, storage, windows },
    price,
  } = vanInfo;

  const { images, ...jsonVan } = vanInfo;

  validate.text(model, "van model");
  validate.text(brand, "van brand");
  validate.boolean(airConditioning, "air conditioning");
  validate.boolean(fridge, "fridge");
  validate.boolean(heating, "heating");
  validate.boolean(insideKitchen, "inside kitchen");
  validate.boolean(accessible, "accessible");
  validate.number(bedCount, "bed count");
  validate.number(doors, "doors");
  validate.number(maxTravellers, "max travelers");
  validate.number(storage, "storage");
  validate.number(windows, "windows");
  validate.number(price, "price");
  debugger;
  return (async () => {
    const token = await data.getToken();

    const formData = new FormData();

    //we add the images to the formData
    images.forEach((image, index) => {
      const file = {
        uri: image.uri,
        name: `van_image_${index}.jpg`,
        type: "image/jpeg",
      } as any;

      formData.append("images", file as unknown as Blob);
    });

    formData.append("vanInfo", JSON.stringify(jsonVan));

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/van`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .catch((error) => {
        console.error(error);
        throw new SystemError(error.message);
      })
      .then((response) => {
        if (response.status === 201) return;

        return response
          .json()
          .catch((error) => {
            console.error(error);
            throw new SystemError(error.message);
          })
          .then((body) => {
            const { error, message } = body;
            const constructor =
              errors[error as keyof typeof errors] || SystemError;
            throw new constructor(message);
          });
      });
  })();
};
