import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Grid,
  Paper,
  Slide,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { useState } from "react";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Product = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [addedToCartMsg, setAddedToCartMsg] = useState(false);
  const [addedToWishlistMsg, setAddedToWishlistMsg] = useState(false);

  const productInfo = {
    productId: item._id,
    title: item.title,
    img: item.img,
    quantity: 1,
    price: item.price,
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
    <Box sx={{ flexGrow: 1 }}>
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

      <Grid container>
        <Grid item xs={12} sm={12}>
          <Item>
            <Link to={`/product/${item._id}`}>
              <ButtonBase
                sx={{
                  width: 128,
                  height: 228,
                  transition: "transform 1s",
                  "&:hover": { transform: "scale(1.2)" },
                  margin: 5,
                }}
              >
                <Img alt="complex" src={item.img} />
              </ButtonBase>
            </Link>
            <Typography gutterBottom variant="subtitle1" component="div">
              {item.title}
            </Typography>
            <Typography variant="subtitle1" component="div">
              ৳{item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock: {item.inStock ? "Available" : "Stock Out"}
            </Typography>
            <Stack direction="column" alignItems="center">
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                  gap: 1,
                }}
              >
                <Button onClick={handleAddToCart} variant="outlined">
                  <ShoppingCartOutlined />
                </Button>
                <Button onClick={handleAddToWishlist} variant="outlined">
                  <FavoriteBorderOutlined />
                </Button>
              </Stack>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
