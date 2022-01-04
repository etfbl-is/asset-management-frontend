import base from "./base.service";

const instance = base.service();

export const getAll = (page, size, sorters) => {
  return instance.get(
    `/assets?page=${page}&size=${size}${getFieldsToSort(sorters)}`
  );
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

const getFieldsToSort = (sorters) => {
  if (!sorters || !sorters.field) return "";
  const direction = sorters.order === "ascend" ? "ASC" : "DESC";
  return `&sort=${sorters.field},${direction}`;
};

export default {
  getAll,
  insert,
  remove,
  update,
};
