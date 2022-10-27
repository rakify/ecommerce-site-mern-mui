// ***** If you make any change in productInfo here u have to change in pages/public/Product component/ProductQuickView component/ProductComponent
// ***** Also make sure to check api/cart

import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  Clear,
  Delete,
  Store,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, addToCart } from "../../redux/apiCalls";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import styled from "@emotion/styled";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cart = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const cart = useSelector((state) => state.cart);

  const groupedCart = cart.products.reduce(
    (
      sellers,
      {
        productId,
        title,
        img,
        quantity,
        price,
        marketPrice,
        seller,
        hasMerchantReturnPolicy,
      }
    ) => {
      if (!sellers[seller]) {
        sellers[seller] = {
          products: [],
        };
      }
      sellers[seller].products.push({
        productId,
        title,
        img,
        quantity,
        price,
        marketPrice,
        seller,
        hasMerchantReturnPolicy,
      });
      return sellers;
    },
    {}
  );

  //Empty Cart Prompt
  const [openEmptyCartDialog, setOpenEmptyCartDialog] = useState(false);

  const handleEmptyCart = () => {
    deleteCart(id, dispatch);
    setOpenEmptyCartDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenEmptyCartDialog(false);
  };

  const handleQuantity = (
    type,
    productId,
    title,
    img,
    quantity,
    price,
    marketPrice,
    seller,
    hasMerchantReturnPolicy
  ) => {
    let productInfo = {
      productId: productId,
      title: title,
      img: img,
      price: price,
      marketPrice: marketPrice,
      seller: seller,
      hasMerchantReturnPolicy: hasMerchantReturnPolicy,
    };
    if (type === "dec") {
      productInfo.quantity = -1;
      addToCart(id, productInfo, dispatch);
    } else if (type === "inc") {
      productInfo.quantity = 1;
      addToCart(id, productInfo, dispatch);
    } else {
      productInfo.quantity = -quantity;
      addToCart(id, productInfo, dispatch);
    }
  };

  return (
    <>
      <Dialog
        open={Boolean(openEmptyCartDialog)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete all products from cart?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed now your cart will be erased. This action is non
            reversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEmptyCart}>Proceed</Button>
        </DialogActions>
      </Dialog>

      <Stack direction="column" gap={1}>
        {!id && (
          <Typography sx={{ textAlign: "center", marginTop: 5 }}>
            You must login to access cart facility.
          </Typography>
        )}
        {cart.products.length === 0 && !cart.error && id && (
          <Typography sx={{ textAlign: "center", marginTop: 5 }}>
            YOUR CART IS CURRENTLY EMPTY!
          </Typography>
        )}

        {cart.products.length > 0 && !cart.error && (
          <Stack
            direction="column"
            sx={{
              height: "70vh",
              overflowY: "scroll",
              overflowX: "hide",
            }}
          >
            {Object.entries(groupedCart).map(([seller, { products }]) => {
              return (
                <Stack direction="column" key={seller}>
                  <Typography
                    variant="overline"
                    sx={{ bgcolor: "#D2D2CF", pl: 1 }}
                  >
                    {seller}
                  </Typography>
                  {products.map(
                    ({
                      productId,
                      title,
                      img,
                      quantity,
                      price,
                      marketPrice,
                      seller,
                      hasMerchantReturnPolicy,
                    }) => (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          borderBottom: "0.1px solid #D2D2CF",
                          flexDirection: { xs: "column", sm: "row" },
                        }}
                        key={productId}
                      >
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ flexDirection: { xs: "row", sm: "column" } }}
                        >
                          <Button
                            variant="text"
                            onClick={() =>
                              handleQuantity(
                                "inc",
                                productId,
                                title,
                                img,
                                quantity,
                                price,
                                marketPrice,
                                seller,
                                hasMerchantReturnPolicy
                              )
                            }
                          >
                            <ArrowUpwardOutlined
                              sx={{ width: 15, color: "gray" }}
                            />
                          </Button>
                          <Typography color="primary">{quantity}</Typography>
                          <Button
                            variant="text"
                            onClick={() =>
                              handleQuantity(
                                "dec",
                                productId,
                                title,
                                img,
                                quantity,
                                price,
                                marketPrice,
                                seller,
                                hasMerchantReturnPolicy
                              )
                            }
                          >
                            <ArrowDownwardOutlined
                              sx={{ width: 15, color: "gray" }}
                            />
                          </Button>
                        </Stack>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Avatar
                            src={img}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 0,
                              mr: 1,
                            }}
                          />
                          <Stack>
                            <Typography sx={{ width: 100 }}>
                              {title.slice(0, 50)}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "gray", fontSize: 10 }}
                            >
                              ৳ {price}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "orangered" }}
                          >
                            ৳ {price * quantity}
                          </Typography>
                        </Stack>
                        <IconButton
                          size="large"
                          onClick={() =>
                            handleQuantity(
                              "remove",
                              productId,
                              title,
                              img,
                              quantity,
                              price,
                              marketPrice,
                              seller,
                              hasMerchantReturnPolicy
                            )
                          }
                        >
                          <Clear />
                        </IconButton>
                      </Stack>
                    )
                  )}
                </Stack>
              );
            })}
          </Stack>
        )}
        {cart.products.length > 0 && (
          <Button
            variant="contained"
            component="a"
            href="/checkout"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>CHECKOUT NOW</Typography>
            <Typography> ৳{cart.total}</Typography>
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Cart;
