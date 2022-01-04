import base from "./base.service";

const instance = base.service(true);

export const getAll = () => {
  return instance.get("/asset-types").then((res) => res.data);
};

export const insert = (assetType) => {
  return instance.post("/asset-types", assetType).then((res) => res.data);
};

export const update = (assetType) => {
  return instance
    .put(`/asset-types/${assetType.id}`, assetType)
    .then((res) => res.data);
};

export const remove = (id) => {
  return instance.delete(`/asset-types/${id}`);
};

export default {
  getAll,
  insert,
  remove,
  update,
};
