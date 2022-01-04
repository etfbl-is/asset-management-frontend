import base from "./base.service";

const instance = base.service();

export const getAll = () => {
  return instance.get("/assets");
};

export const insert = (asset) => {
  return instance.post("/assets", asset).then((res) => res.data);
};

export const update = (asset) => {
  return instance.put(`/assets/${asset.id}`, asset).then((res) => res.data);
};

export const remove = (id) => {
  return instance.delete(`/assets/${id}`);
};

export default {
  getAll,
  insert,
  remove,
  update,
};
