import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
  InfoOutlined,
  Close,
  Cancel,
} from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Paper,
  Slide,
  Snackbar,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import Product, { default as ProductPage } from "../pages/public/Product";
import ProductQuickView from "./ProductQuickView";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade direction="left" ref={ref} {...props} />;
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: 400,
  height: 300,
  margin: 5,
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  fontWeight: 700,
}));

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ProductComponent = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [openProduct, setOpenProduct] = useState(false);
  const [addedToCartMsg, setAddedToCartMsg] = useState(false);
  const [addedToWishlistMsg, setAddedToWishlistMsg] = useState(false);

  const productInfo = {
    productId: item._id,
    title: item.title,
    img: item.img,
    quantity: 1,
    price: item.price,
    marketPrice: item.marketPrice,
    seller: item.seller,
    hasMerchantReturnPolicy: item.hasMerchantReturnPolicy,
  };

  const handleAddToCart = () => {
    !user && navigate("/login");
    user &&
      addToCart(user._id, productInfo, dispatch).then(() => {
        setAddedToCartMsg(true);
      });
  };

  const handleAddToWishlist = () => {
    !user && navigate("/login");
    user &&
      addToWishlist(user._id, productInfo).then(() => {
        setAddedToWishlistMsg(true);
      });
  };

  return (
    <Grid item lg={3} sm={5} xs={10}>
      <Item
        sx={{
          "&:hover": {
            "& .details": {
              opacity: 1,
              height: 30,
              webkitTransition: "all 1s linear",
              mozTransition: "all 1s linear",
              transition: "all 1s linear",
              overflow: "hidden",
            },
          },
        }}
      >
        <Stack
          direction="column"
          sx={{
            flex: 2,
            height: 150,
            width: 200,
            position: "relative",
          }}
        >
          <Img alt="PRODUCT" src={item.img} />
          <Stack
            direction="row"
            justifyContent="space-evenly"
            className="details"
            sx={{
              opacity: 0,
              width: 200,
              height: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              bgcolor: "transparent",
              pt: 1,
              position: "absolute",
              bottom: 0,
              color: "black",
            }}
          >
            <IconButton
              color="primary"
              size="small"
              onClick={handleAddToCart}
              sx={{ "&:hover": { bgcolor: "#CBF1F5", br: "50%" } }}
            >
              <Tooltip title="Add to Cart" placement="top" arrow>
                <ShoppingCartOutlined fontSize="inherit" />
              </Tooltip>
            </IconButton>
            <IconButton
              color="primary"
              size="small"
              onClick={handleAddToWishlist}
              sx={{ "&:hover": { bgcolor: "#CBF1F5", br: "50%" } }}
            >
              <Tooltip title="Add to Wishlist" placement="top" arrow>
                <FavoriteBorderOutlined fontSize="inherit" />
              </Tooltip>
            </IconButton>
            <IconButton
              color="primary"
              size="small"
              sx={{ "&:hover": { bgcolor: "#CBF1F5", br: "50%" } }}
            >
              <Link to={`/product/${item._id}`} sx={{ textDecoration: "none" }}>
                <Tooltip title="View Details" placement="top" arrow>
                  <InfoOutlined fontSize="inherit" />
                </Tooltip>
              </Link>
            </IconButton>
          </Stack>
        </Stack>

        <Button
          onClick={() => setOpenProduct(true)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            width: 300,
          }}
        >
          <ProductTitle>{item.title}</ProductTitle>
          <Typography sx={{ fontWeight: 600, color: "orangered" }}>
            ৳{item.price}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 400 }}
          >
            <s>৳{item.marketPrice}</s>{" "}
            <b style={{ fontWeight: 600 }}>
              {Math.round(
                ((item.marketPrice - item.price) / item.marketPrice) * 100
              ) > 0 &&
                Math.round(
                  ((item.marketPrice - item.price) / item.marketPrice) * 100
                ) + "%"}
            </b>
          </Typography>
        </Button>
      </Item>

      <Dialog
        TransitionComponent={Transition}
        open={openProduct}
        onClose={() => setOpenProduct(false)}
        scroll="body"
        aria-labelledby="title"
      >
        <DialogTitle
          id="title"
          variant="button"
          sx={{ pb: 1, display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="button">
            {item.title}{" "}
            <Typography variant="subtitle2">ID: {item._id}</Typography>
          </Typography>{" "}
          <Chip
            icon={<Cancel />}
            label="Cancel"
            onClick={() => setOpenProduct(false)}
            color="error"
            size="small"
          />
        </DialogTitle>
        <DialogContent>
          <ProductQuickView productId={item._id} />
        </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(addedToCartMsg)}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
        onClose={() => setAddedToCartMsg(false)}
        message="Added To Cart"
      />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={addedToWishlistMsg}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
        onClose={() => setAddedToWishlistMsg(false)}
        message="Added To Wishlist"
      />
    </Grid>
  );
};

export default ProductComponent;
