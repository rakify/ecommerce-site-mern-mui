import {
  loginFailure,
  loginStart,
  loginSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./userRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import axios from "axios";

axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL = "http://localhost:4000/api";

//Notifications
export const getNotifications = async () => {
  try {
    const res = await axios.get(`/notifications?SORTBY=CREATEDAT`);
    return res;
  } catch (err) {
    return err;
  }
};

export const sendNotification = async (notification) => {
  try {
    const res = await axios.post(`/notifications`, notification);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    const res = await axios.delete(`/notifications/${notificationId}`);
    return res;
  } catch (err) {
    return err;
  }
};

//Users
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/users?sortBy=createdAt");
    dispatch(getUserSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getUserFailure());
    return err;
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`/users/${id}`);
    dispatch(deleteUserSuccess({ id: id }));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await axios.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
    return res;
  } catch (err) {
    dispatch(updateUserFailure());
    return err;
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await axios.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data.data));
    return res;
  } catch (err) {
    dispatch(addUserFailure());
    return err;
  }
};

//Products
export const getProduct = async (id) => {
  try {
    const res = await axios.get(`/products/find/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/products?new=true");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`/products/${id}`);
    dispatch(deleteProductSuccess({ id: id }));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await axios.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
    return res;
  } catch (err) {
    dispatch(updateProductFailure());
    return err;
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await axios.post(`/products`, product);
    dispatch(addProductSuccess(res.data.data));
    return res;
  } catch (err) {
    dispatch(addProductFailure());
    return err;
  }
};

//Orders
export const getOrder = async (id) => {
  try {
    const res = await axios.get(`/orders/order/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`/orders?sortBy=createdAt`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`/orders/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateOrder = async (id, order) => {
  try {
    // update
    const res = await axios.put(`/orders/${id}`, order);
    return res;
  } catch (err) {
    return err;
  }
};

//Categories

export const addCat = async (category) => {
  try {
    const res = await axios.post(`/categories`, category);
    return res;
  } catch (err) {
    return err;
  }
};


export const getCat = async (id) => {
  try {
    const res = await axios.get(`/categories/find/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const getCats = async () => {
  try {
    const res = await axios.get(`/categories?sortBy=createdAt`);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteCat = async (id) => {
  try {
    const res = await axios.delete(`/categories/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateCat = async (id, cat) => {
  try {
    // update
    const res = await axios.put(`/categories/${id}`, cat);
    return res;
  } catch (err) {
    return err;
  }
};
