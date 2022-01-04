import base from "./base.service";

const instance = base.service();

export const getAll = () => {
  return instance.get("/asset-statuses");
};

export const insert = (assetStatus) => {
  return instance.post("/asset-statuses", assetStatus).then((res) => res.data);
};

export const update = (assetStatus) => {
  return instance
    .put(`/asset-statuses/${assetStatus.id}`, assetStatus)
    .then((res) => res.data);
};

export const remove = (id) => {
  return instance.delete(`/asset-statuses/${id}`);
};

export default {
  getAll,
  insert,
  remove,
  update,
};
