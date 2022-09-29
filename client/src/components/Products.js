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

const Products = ({ cartOpen, cat, limit }) => {
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [num, setNum] = useState(20);
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

  useEffect(() => {
    cartOpen && setNum(15);
    !cartOpen && setNum(20);
  }, [cartOpen]);

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
          <Grid
            container
            rowSpacing={2}
            columnSpacing={1}
            columns={{ xs: 5, sm: 10, md: num }}
          >
            {/* columns 5 = 1 product */}
            {cat
              ? filteredProducts
                  .slice(0, limit)
                  .map((item) => <Product item={item} key={item._id} />)
              : products
                  .slice(0, limit)
                  .map((item) => <Product item={item} key={item._id} />)}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default Products;
