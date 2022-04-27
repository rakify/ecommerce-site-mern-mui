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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cart = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const cart = useSelector((state) => state.cart);

  //Tab options
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Empty Cart Prompt
  const [openEmptyCartDialog, setOpenEmptyCartDialog] = useState(false);

  const handleEmptyCart = () => {
    deleteCart(id, dispatch);
    setOpenEmptyCartDialog(false);
    setValue(0);
  };

  const handleCloseDialog = () => {
    setOpenEmptyCartDialog(false);
    setValue(0);
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

      <Typography variant="h6">Your Cart</Typography>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ margin: 2 }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
          centered
          sx={{ width: { xs: 300, sm: "100%" } }}
        >
          <Tab
            icon={<ShoppingCartOutlined />}
            label={
              cart.products.length === 0
                ? "Cart"
                : `Cart (${cart.products.length})`
            }
          />
          <Link href="/wishlist/" underline="none" color="inherit">
            <Tab icon={<FavoriteBorderOutlined />} label="Wishlist" />
          </Link>
          <Tab
            icon={<DeleteForeverOutlined />}
            label="Empty Cart"
            onClick={() => setOpenEmptyCartDialog(true)}
          />
        </Tabs>

        {cart.products.length === 0 && !cart.error && (
          <Typography sx={{ textAlign: "center", marginTop: 5 }}>
            YOUR CART IS CURRENTLY EMPTY!
          </Typography>
        )}

        {cart.products.length > 0 && !cart.error && (
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Link href="/" underline="none" color="inherit">
                <Button variant="outlined">Continue Shopping</Button>
              </Link>
              <Link href="/checkout" underline="none" color="inherit">
                <Button variant="outlined">Checkout Now</Button>
              </Link>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
              <Stack flex="3" direction="column">
                {cart.products.map((product) => (
                  <React.Fragment key={product._id}>
                    <Stack
                      direction="row"
                      sx={{
                        borderBottom: "1px solid gray",
                        gap: 5,
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Avatar
                        src={product.img}
                        sx={{
                          width: 200,
                          height: 150,
                          borderRadius: 0,
                          transition: "transform .5s",
                          "&:hover": { transform: "scale(1.2)" },
                          margin: 5,
                        }}
                      />

                      <Stack
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
                        sx={{ flexDirection: { xs: "row", sm: "column" } }}
                      >
                        <ArrowUpwardOutlined
                          style={{ cursor: "pointer", color: "grey" }}
                          onClick={() =>
                            handleQuantity(
                              "inc",
                              product.productId,
                              product.title,
                              product.img,
                              product.price
                            )
                          }
                        />
                        <Typography>{product.quantity}</Typography>
                        <ArrowDownwardOutlined
                          style={{ cursor: "pointer", color: "grey" }}
                          onClick={() =>
                            handleQuantity(
                              "dec",
                              product.productId,
                              product.title,
                              product.img,
                              product.price
                            )
                          }
                        />
                      </Stack>

                      <Stack>
                        <Typography>
                          Product:
                          {product.title}
                        </Typography>
                        <Typography>
                          ID:
                          {product._id}
                        </Typography>
                        <Typography>Price: ৳ {product.price}</Typography>
                        <Typography>
                          Size:
                          {product.size?.toUpperCase()}
                        </Typography>
                        <Typography>
                          Quantity:
                          {product.quantity}
                        </Typography>
                      </Stack>
                      <Stack alignItems="center" justifyContent="center">
                        <Typography>
                          ৳ {product.price * product.quantity}
                        </Typography>
                      </Stack>
                    </Stack>
                  </React.Fragment>
                ))}
              </Stack>
              <Stack flex="2" alignItems="center">
                <Typography variant="h6">ORDER SUMMARY</Typography>

                <Typography>Subtotal: ৳ {cart.total}</Typography>

                <Typography>Estimated Shipping: ৳ 50</Typography>

                <Typography>Shipping Discount: ৳ -50</Typography>

                <Typography>Total: ৳ {cart.total}</Typography>

                <Link
                  href="/checkout"
                  underline="none"
                  color="inherit"
                  sx={{ mt: 10 }}
                >
                  <Button variant="contained">CHECKOUT NOW</Button>
                </Link>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default Cart;
