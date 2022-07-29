import styled from "@emotion/styled";
import {
  ButtonBase,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const Img = styled("img")({
  display: "block",
  marginRight: 10,
  height: 40,
  width: 40,
});

const ShopList = () => {
  return (
    <>
      <Typography variant="h6">Shops</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pl: 10,
          pr: 10,
          pt: 5,
          pb: 5,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Stack>
          <Typography variant="subtitle1">Clothing Brand</Typography>
          <Link underline="none" href="#">
            Easy Fashion
          </Link>
          <Link underline="none" href="#">
            Grameen Uniqlo
          </Link>
          <Link underline="none" href="#">
            Navada
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Skin Care & Beauty</Typography>
          <Link underline="none" href="#">
            Shop All Skincare
          </Link>
          <Link underline="none" href="#">
            Shop All Beauty
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Grocery</Typography>
          <Link underline="none" href="/products/fruit">
            Chaldal
          </Link>
          <Link underline="none" href="#">
            Daraz
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Electronics</Typography>
          <Link underline="none" href="/products/electronic">
            Othoba
          </Link>
          <Link underline="none" href="#">
            Priyoshop
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Beverages</Typography>
          <Link underline="none" href={"#"}>
            Pepsi
          </Link>
          <Link underline="none" href="/products/electronic">
            Cocacola
          </Link>
          <Link underline="none" href="#">
            Mojo
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default ShopList;
