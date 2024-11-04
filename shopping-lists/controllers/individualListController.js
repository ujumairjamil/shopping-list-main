import * as individualListService from "../services/individualListService.js";

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const createListEntry = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");

  const formData = await request.formData();
  const itemName = formData.get("name");

  await individualListService.insertIntoIndividual(parts[2], itemName);

  return redirectTo(`/lists/${parts[2]}`);
};

const markAsCollected = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  await individualListService.itemCollection(parts[4]);

  return redirectTo(`/lists/${parts[2]}`);
};

export { createListEntry, markAsCollected };
