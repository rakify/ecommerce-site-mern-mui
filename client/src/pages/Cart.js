import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  DeleteForeverOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, addToCart } from "../redux/apiCalls";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Link,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import React, { useState } from "react";
import styled from "@emotion/styled";

const ProductTitle = styled(Typography)(({ theme }) => ({
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  fontWeight: 700,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cart = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const cart = useSelector((state) => state.cart);

  //Empty Cart Prompt
  const [openEmptyCartDialog, setOpenEmptyCartDialog] = useState(false);

  const handleEmptyCart = () => {
    deleteCart(id, dispatch);
    setOpenEmptyCartDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenEmptyCartDialog(false);
  };

  const handleQuantity = (type, productId, title, img, price) => {
    let productInfo = {
      productId: productId,
      title: title,
      img: img,
      price: price,
    };
    if (type === "dec") {
      productInfo.quantity = -1;
      addToCart(id, productInfo, dispatch);
    } else {
      productInfo.quantity = 1;
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
            You must login to access cart facility. Thank You
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
            sx={{ maxHeight: "70vh", overflowY: "scroll", overflowX: "hide" }}
          >
            {cart.products.map((product) => (
              <Stack
                key={product._id}
                direction="row"
                sx={{
                  borderBottom: "1px solid gray",
                  flexDirection: { xs: "column", sm: "row" },
                }}
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
                        product.productId,
                        product.title,
                        product.img,
                        product.price
                      )
                    }
                  >
                    <ArrowUpwardOutlined sx={{ width: 15, color: "gray" }} />
                  </Button>
                  <Typography color="primary">{product.quantity}</Typography>
                  <Button
                    variant="text"
                    onClick={() =>
                      handleQuantity(
                        "dec",
                        product.productId,
                        product.title,
                        product.img,
                        product.price
                      )
                    }
                  >
                    <ArrowDownwardOutlined sx={{ width: 15, color: "gray" }} />
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Avatar
                    src={product.img}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 0,
                      mr: 1,
                    }}
                  />
                  <Stack>
                    <Typography sx={{ width: 100 }}>
                      {product.title.slice(0, 50)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "gray", fontSize: 10 }}
                    >
                      ৳ {product.price}
                    </Typography>
                  </Stack>
                  <Typography variant="subtitle2">
                    ৳ {product.price * product.quantity}
                  </Typography>
                </Stack>
              </Stack>
            ))}
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
