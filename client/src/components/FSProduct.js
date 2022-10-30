import styled from "@emotion/styled";
import { ButtonBase, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Img = styled("img")({});
const FSProduct = ({ item }) => {
  return (
    <Stack
      sx={{ flex: 3, padding: { sm: 0, md: 2 } }}
      alignItems="center"
      justifyContent="center"
      height={150}
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
      >
        <Link to={`/product/${item._id}`}>
          <Img
            alt="PRODUCT"
            src={item.img}
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
      </ButtonBase>
      <Stack direction="column" justifyContent="center" sx={{ flex: 1 }}>
        <Typography variant="subtitle1" component="div">
          ৳{item.price}{" "}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FSProduct;
