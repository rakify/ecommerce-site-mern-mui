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
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure,
} from "./cartRedux";
import axios from "axios";

axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL = "http://localhost:4000/api";

//User
export const logout = async () => {
  await axios.get("/auth/logout");
  window.localStorage.clear();
  window.location = "/login";
};

export const register = async (user) => {
  try {
    const res = await axios.post(`/auth/register`, user);
    return res;
  } catch (err) {
    return err;
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res;
  } catch (err) {
    dispatch(loginFailure(err.response.data));
    return err;
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

//Products
//(public)
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/products/?new=true");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
//get seller products (public)
export const getSellerProducts = async (seller) => {
  try {
    const res = await axios.get(`/products/${seller}?new=true`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getProductsAsCategory = async (cat) => {
  try {
    const res = await axios.get(`/products/?category=${cat}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getProductById = async (productId) => {
  try {
    const res = await axios.get(`/products/find/${productId}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

//Seller
//when seller logged in
export const getProductsAsSeller = async (seller, dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(`/products/${seller}?new=true`);
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteSellerProduct = async (id) => {
  try {
    await axios.delete(`/products/${id}`);
  } catch (err) {
    return err;
  }
};

export const updateSellerProduct = async (id, product) => {
  try {
    // update
    const res = await axios.put(`/products/${id}`, product);
    return res;
  } catch (err) {
    return err;
  }
};

export const addSellerProduct = async (product) => {
  try {
    const res = await axios.post(`/products`, product);
    return res;
  } catch (err) {
    return err;
  }
};

//get seller info (public)
export const getSellerDetails = async (username) => {
  try {
    const res = await axios.get(`/users/username/${username}`);
    return res.data;
  } catch (err) {
    return err;
  }
};


//Cart
export const getCartProducts = async (id, dispatch) => {
  dispatch(getCartStart());
  try {
    const res = await axios.get(`/carts/find/${id}`);
    dispatch(getCartSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(getCartFailure());
  }
};

export const addToCart = async (id, product, dispatch) => {
  dispatch(addToCartStart());
  try {
    const res = await axios.post(`/carts/${id}`, product);
    dispatch(addToCartSuccess(res.data));
  } catch (err) {
    dispatch(addToCartFailure());
  }
};

export const deleteCart = async (id, dispatch) => {
  dispatch(deleteCartStart());
  try {
    await axios.delete(`/carts/${id}`);
    dispatch(deleteCartSuccess());
  } catch (err) {
    dispatch(deleteCartFailure());
  }
};

//Wishlist
export const getWishlistProducts = async (id) => {
  try {
    const res = await axios.get(`/wishlist/find/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const addToWishlist = async (id, product) => {
  try {
    const res = await axios.post(`/wishlist/${id}`, product);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteWishlist = async (id) => {
  try {
    const res = await axios.delete(`/wishlist/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

//Order
export const addOrder = async (order) => {
  try {
    const res = await axios.post("/orders", order);
    return res;
  } catch (err) {
    return err;
  }
};

export const getOrders = async (id) => {
  try {
    const res = await axios.get(`/orders/find/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

//Categories
export const getCats = async () => {
  try {
    const res = await axios.get(`/categories?sortBy=createdAt`);
    return res;
  } catch (err) {
    return err;
  }
};
