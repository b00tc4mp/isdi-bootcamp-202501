import { validate } from "@/com";
import { UpdateVanParam } from "./types";
import { errors } from "@/com";
import { data } from "@/data";
import { getApiUrl } from "@/getApiUrl";

const { SystemError } = errors;

export const updateVanData = (vanInfo: UpdateVanParam) => {
  const {
    model,
    brand,
    features: { airConditioning, fridge, heating, insideKitchen },
    traits: { accessible, bedCount, doors, maxTravellers, storage, windows },
    price,
    id,
  } = vanInfo;

  const { imagesToUpload, ...jsonVan } = vanInfo;

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

  const apiUrl = getApiUrl();

  const formData = new FormData();

  vanInfo.imagesToUpload.forEach((image, index) => {
    const file = {
      uri: image.uri,
      name: `van_image_${index}.jpg`,
      type: "image/jpeg",
    } as any;

    formData.append("images", file as unknown as Blob);
  });

  formData.append("vanInfo", JSON.stringify(jsonVan));
  return (async () => {
    let token;
    try {
      token = data.getToken();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    try {
      await fetch(`${apiUrl}/vans/edit/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    } catch (error) {
      throw new SystemError((error as Error).message);
    }
  })();
};
