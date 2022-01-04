import {
  ROLE_ADMIN,
  ROLE_USER,
  STATUS_ACTIVE,
  STATUS_BLOCKED,
  STATUS_REQUESTED,
} from "../util.js/constants";
import base from "./base.service";

const instance = base.service();
const securedInstance = base.service(true);

export const login = (username, password) =>
  instance.post("/login", { username, password }).then((res) => {
    const user = res.data;
    sessionStorage.setItem("auth", user.token);
    return { ...user, token: null };
  });

export const signUp = (user) => instance.post("/sign-up", user);

export const state = () => {
  return securedInstance.get("/state").then((res) => res.data);
};
export const logout = () => sessionStorage.removeItem("auth");

export const getAll = () =>
  securedInstance.get("/users").then((res) => res.data);

export const update = (user) =>
  securedInstance.put(`/users/${user.id}`, user).then((res) => res.data);

export const changeStatus = (user) => {
  const request = {
    id: user.id,
  };
  if (user.status === STATUS_REQUESTED) request.status = STATUS_ACTIVE;
  else if (user.status === STATUS_ACTIVE) request.status = STATUS_BLOCKED;
  else request.status = STATUS_ACTIVE;
  return securedInstance
    .patch(`/users/${user.id}/status`, request)
    .then(() => request);
};
export const changeRole = (user) => {
  const request = {
    id: user.id,
    role: user.role === ROLE_ADMIN ? ROLE_USER : ROLE_ADMIN,
  };
  return securedInstance
    .patch(`/users/${user.id}/role`, request)
    .then(() => request);
};

export default {
  login,
  state,
  logout,
  getAll,
  update,
  changeStatus,
  changeRole,
  signUp,
};
