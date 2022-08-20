import { useEffect, useState } from "react";
import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import Product from "./ProductComponent";
import { useSelector } from "react-redux";
import { getProductsAsCategory } from "../redux/apiCalls";

const Select = styled("select")(({ theme }) => ({
  padding: "5px",
  marginRight: "20px",
  // ${mobile({ margin: "10px 0" })}
}));
const Option = styled("option")(({ theme }) => ({}));

const Products = ({ cat, limit }) => {
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("newest");
  useEffect(() => {
    getProductsAsCategory(cat).then((res) => setFilteredProducts(res));
  }, [cat]);

  // console.log(filteredProducts)

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      {cat && filteredProducts.length === 0 ? (
        <Typography>No products available yet under this category.</Typography>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ bgcolor: "whitesmoke" }}
        >
          <Box flex={7} p={2}>
            <Grid container columns={10} sx={{}}>
              {" "}
              {/* 10 columns thus each with size 2 = 5 items in a column */}
              {cat
                ? filteredProducts
                    .slice(0, limit)
                    .map((item) => <Product item={item} key={item._id} />)
                : products
                    .slice(0, limit)
                    .map((item) => <Product item={item} key={item._id} />)}
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Products;
