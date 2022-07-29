import styled from "@emotion/styled";
import { ButtonBase, Stack, Typography } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
const FSProduct = ({ item }) => {
  return (
    <Stack
      sx={{ flex: 3, padding: { sm: 0, md: 2 } }}
      alignItems="center"
      justifyContent="center"
    >
      <ButtonBase
        sx={{
          flex: 1,
          height: 70,
          width: 80,
          transition: "transform 1s",
          "&:hover": { transform: "scale(1.2)" },
          margin: 2,
        }}
        href={`/product/${item._id}`}
      >
        <Img
          alt="PRODUCT"
          src={item.img}
          sx={{ maxWidth: 70, maxHeight: 60 }}
        />
      </ButtonBase>
      <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
        <Typography variant="subtitle1" component="div">
          ৳{item.price}{" "}
        </Typography>
        <Typography variant="body2">Trending Now</Typography>
      </Stack>
    </Stack>
  );
};

export default FSProduct;
