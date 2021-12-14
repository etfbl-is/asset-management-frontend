import base from "./base.service";

const instance = base.service();

export const getAll = () => {
  return instance.get("/locations");
};

export const insert = (location) => {
  return instance.post("/locations", location).then((res) => res.data);
};

export const update = (location) => {
  return instance
    .put(`/locations/${location.id}`, location)
    .then((res) => res.data);
};

export const remove = (id) => {
  return instance.delete(`/locations/${id}`);
};

export default {
  getAll,
  insert,
  remove,
  update,
};
