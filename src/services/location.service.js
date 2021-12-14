import base from "./base.service";

const instance = base.service();

export const getAll = () => {
  return instance.get("/locations");
};

export default {
  getAll,
};
