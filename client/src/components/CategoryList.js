import styled from "@emotion/styled";
import { ChevronRight } from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Divider,
  Link,
  Paper,
  Stack,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import SubCatList from "./SubCatList";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100vw",
    padding: 20,
    fontSize: 15,
    mr: 20,
  },
}));

const CategoryList = () => {
  return (
    <>
      <Typography sx={{ pl: 5, fontSize: 20 }}>Categories</Typography>
      <Divider sx={{ m: 2 }} />
      <Stack
        justifyContent="space-between"
        sx={{
          p: 2,
          gap: 2,
          cursor: "grab",
        }}
      >
        <HtmlTooltip title={<SubCatList />} placement="right-end" arrow>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Male Fashion</Typography>
            <ChevronRight />
          </Stack>
        </HtmlTooltip>
        <HtmlTooltip title={<SubCatList />} placement="right-end" arrow>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Female Fashion</Typography>
            <ChevronRight />
          </Stack>
        </HtmlTooltip>
        <HtmlTooltip title={<SubCatList />} placement="right-end" arrow>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Consumer Electronics</Typography>
            <ChevronRight />
          </Stack>
        </HtmlTooltip>
        <HtmlTooltip title={<SubCatList />} placement="right-end" arrow>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Beauty Cares</Typography>
            <ChevronRight />
          </Stack>
        </HtmlTooltip>
        <HtmlTooltip title={<SubCatList />} placement="right-end" arrow>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Baby Products</Typography>
            <ChevronRight />
          </Stack>
        </HtmlTooltip>

        {/* <Stack>
          <Typography variant="subtitle1">Male</Typography>
          <Link underline="none" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="none" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Female</Typography>
          <Link underline="none" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="none" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Grocery</Typography>
          <Link underline="none" href="/products/fruit">
            Fruits & Vegetables
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="none" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Electronics</Typography>
          <Link underline="none" href="/products/electronic">
            Mobile
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="none" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack>
        <Stack>
          <Typography variant="subtitle1">Beverages</Typography>
          <Link underline="none" href={"#"}>
            Pepsi
          </Link>
          <Link underline="none" href="/products/electronic">
            Electronics
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tshirts
          </Link>
          <Link underline="none" href="/products/tshirt">
            Tops
          </Link>
          <Link underline="none" href="/products/tshirt">
            Bottoms
          </Link>
        </Stack> */}
      </Stack>
    </>
  );
};

export default CategoryList;
