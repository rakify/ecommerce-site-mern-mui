import {
  DeleteForeverOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  deleteWishlist,
  getWishlistProducts,
} from "../../redux/apiCalls";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Link,
  Tabs,
  Tab,
  Paper,
  Slide,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Wishlist = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const [value, setValue] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  //Display added to cart message
  const [addedToCartMsg, setAddedToCartMsg] = useState(false);
  //Empty Cart Prompt
  const [openEmptyWishlistDialog, setOpenEmptyWishlistDialog] = useState(false);

  const handleEmptyWishlist = () => {
    deleteWishlist(id);
    setWishlistProducts([]);
    setOpenEmptyWishlistDialog(false);
    setValue(0);
  };

  const handleCloseDialog = () => {
    setOpenEmptyWishlistDialog(false);
    setValue(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddToCart = (item) => {
    const productInfo = {
      productId: item.productId,
      title: item.title,
      img: item.img,
      quantity: 1,
      price: item.price,
    };
    !id && Navigate("/login");
    id &&
      addToCart(id, productInfo, dispatch).then(() => {
        setAddedToCartMsg(true);
      });
  };

  useEffect(() => {
    getWishlistProducts(id).then(
      (res) => res && setWishlistProducts(res.products)
    );
  }, [id]);

  return (
    <>
      {/* Display Prompt */}
      <Dialog
        open={Boolean(openEmptyWishlistDialog)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete all products from wishlist?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you proceed your wishlist will be erased. This action is non
            reversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEmptyWishlist}>Proceed</Button>
        </DialogActions>
      </Dialog>

      {/* Display Added To Cart Message */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={addedToCartMsg}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
        onClose={() => setAddedToCartMsg(false)}
        message="Added To Cart"
      />

      <Typography variant="h6">Your Wishlist</Typography>
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
            icon={<FavoriteBorderOutlined />}
            label={
              wishlistProducts.length === 0
                ? "Wishlist"
                : `Wishlist (${wishlistProducts.length})`
            }
          />
          <Tab
            icon={<DeleteForeverOutlined />}
            label="Empty Wishlist"
            onClick={() => setOpenEmptyWishlistDialog(true)}
          />
        </Tabs>

        {wishlistProducts.length === 0 && (
          <Typography sx={{ textAlign: "center", marginTop: 5 }}>
            THERE ARE NO PRODUCT AVAILABLE IN YOUR WISHLIST.
          </Typography>
        )}

        {wishlistProducts.map((product) => (
          <Paper key={product.productId}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              sx={{}}
            >
              <Stack direction="row">
                <Avatar
                  src={
                    product.img ||
                    "https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg"
                  }
                  sx={{
                    height: 150,
                    width: 200,
                    borderRadius: 0,
                    transition: "transform .5s",
                    "&:hover": { transform: "scale(1.2)" },
                    margin: 5,
                  }}
                />
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>{product.title}</Typography>
                  <Typography>৳ {product.price}</Typography>
                </Stack>
              </Stack>
              <Stack direction="column" sx={{ gap: 1 }}>
                <Link
                  href={`/product/${product.productId}`}
                  underline="none"
                  color="inherit"
                >
                  <Button variant="outlined">
                    <Typography>View Details</Typography>
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  onClick={() => handleAddToCart(product)}
                >
                  <Typography>Add to Cart</Typography>
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </>
  );
};

export default Wishlist;
