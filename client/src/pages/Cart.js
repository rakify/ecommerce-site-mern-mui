import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  DeleteForeverOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, addCart } from "../redux/apiCalls";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Link,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { useState } from "react";
const Cart = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const cart = useSelector((state) => state.cart);

  const emptyCart = () => {
    id && deleteCart(id, dispatch);
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
      addCart(id, productInfo, dispatch);
    } else {
      productInfo.quantity = 1;
      addCart(id, productInfo, dispatch);
    }
  };

  return (
    <>
      <Typography variant="h6">Your Cart</Typography>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ margin: 2 }}
      >
        {cart.products.length === 0 && !cart.error && (
          <Typography>YOUR CART IS CURRENTLY EMPTY!</Typography>
        )}

        {cart.products.length > 0 && !cart.error && (
          <>
            <Stack direction="row" justifyContent="space-between">
              <Link href="/" underline="none" color="inherit">
                <Button variant="outlined">Continue Shopping</Button>
              </Link>
              <Link href="/checkout" underline="none" color="inherit">
                <Button variant="outlined">Checkout Now</Button>
              </Link>
            </Stack>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon tabs example"
              centered
            >
              <Tab icon={<ShoppingCartOutlined />} aria-label="Bag" />
              <Tab icon={<FavoriteBorderOutlined />} aria-label="Wishlist" />
              <Tab icon={<DeleteForeverOutlined />} aria-label="phone" />
            </Tabs>

            <Stack direction="row" justifyContent="space-between">
              <Stack flex="3" direction="column">
                {cart.products.map((product) => (
                  <>
                    <Stack
                      direction="row"
                      sx={{ borderBottom: "1px solid gray", gap: 5 }}
                    >
                      <Avatar
                        src={product.img}
                        sx={{ width: 200, height: 150, borderRadius: 0,
                          transition: "transform .5s",
                          "&:hover": { transform: "scale(1.2)" },
                          margin: 5, }}
                      />

                      <Stack
                        direction="column"
                        justifyContent="space-around"
                        alignItems="center"
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
                  </>
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
