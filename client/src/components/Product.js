import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { addCart } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Product = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const productInfo = {
    productId: item._id,
    title: item.title,
    img: item.img,
    quantity: 1,
    price: item.price,
  };

  const handleClick = () => {
    !user && navigate("/login");
    user && addCart(user._id, productInfo, dispatch);
  };

  return (
    <Paper
      sx={{
        p: 2,
        width: 250,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2} sx={{border:0}}>
        <Grid item>
          <Link to={`/product/${item._id}`}>
            <ButtonBase
              sx={{
                width: 228,
                height: 128,
                transition: "transform 2s",
                "&:hover": { transform: "scale(1.2)" },
                margin: 5,
              }}
            >
              <Img alt="complex" src={item.img} />
            </ButtonBase>
          </Link>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" component="div">
              ৳{item.price}
            </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {item.inStock ? "Available" : "Stock Out"}
              </Typography>
            </Grid>
          </Grid>
          <Stack direction="column" alignItems='center'>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              cursor: "pointer",
              gap: 1,
            }}
          >
            <Button onClick={handleClick} variant="outlined">
              <ShoppingCartOutlined />
            </Button>
            <Button variant="outlined">
              <FavoriteBorderOutlined />
            </Button>
          </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Product;
