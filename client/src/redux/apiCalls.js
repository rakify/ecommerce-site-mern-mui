import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
} from "./productRedux";
import {
  getCartStart,
  getCartSuccess,
  getCartFailure,
  addCartStart,
  addCartSuccess,
  addCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} from "./cartRedux";
import axios from "axios";

axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL = "http://localhost:4000/api";

export const logout = async () => {
  await axios.get("/auth/logout");
  window.localStorage.clear();
  window.location = "/login";
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
    return res;
  } catch (err) {
    dispatch(updateUserFailure(err.response.data));
    return err;
  }
};

export const getUser = async (id, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`/users/find/${id}`);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getCartProducts = async (id, dispatch) => {
  dispatch(getCartStart());
  try {
    const res = await axios.get(`/carts/find/${id}`);
    dispatch(getCartSuccess(res.data));
  } catch (err) {
    dispatch(getCartFailure());
  }
};

export const addCart = async (id, product, dispatch) => {
  dispatch(addCartStart());
  try {
    const res = await axios.post(`/carts/${id}`, product);
    dispatch(addCartSuccess(res.data));
  } catch (err) {
    dispatch(addCartFailure());
  }
};

export const deleteCart = async (id, dispatch) => {
  dispatch(deleteCartStart());
  try {
    const res = await axios.delete(`/carts/${id}`);
    dispatch(deleteCartSuccess(res.data));
  } catch (err) {
    dispatch(deleteCartFailure());
  }
};

export const addOrder = async (order) => {
  try {
    const res = await axios.post("/orders", order);
    return res;
  } catch (err) {
    return err;
  }
};
