import { Link, Stack, Typography } from "@mui/material";
import React from "react";

const SubCatList = () => {
  return (
    <Stack direction="column" sx={{gap:2}}>
      <Stack direction="row" justifyContent="space-between" sx={{ gap: 5 }}>
        <Stack>
          <Typography variant="subtitle1">Male</Typography>
          <Link underline="hover" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Female</Typography>
          <Link underline="hover" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Grocery</Typography>
          <Link underline="hover" href="/products/fruit">
            Fruits & Vegetables
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{ gap: 5 }}>
        <Stack>
          <Typography variant="subtitle1">Electronics</Typography>
          <Link underline="hover" href="/products/electronic">
            Mobile
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Beverages</Typography>
          <Link underline="hover" href={"#"}>
            Pepsi
          </Link>
          <Link underline="hover" href="/products/electronic">
            Electronics
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Baby Products</Typography>
          <Link underline="hover" href={"#"}>
            Baby Car Seats
          </Link>
          <Link underline="hover" href="/products/electronic">
            Baby Vehicles
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Baby Tshirts
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Baby Pants
          </Link>
          <Link underline="hover" href="/products/tshirt">
            Baby Bottoms
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SubCatList;
