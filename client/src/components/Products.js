import { useEffect, useState } from "react";
import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import Product from "./Product";
import { useSelector } from "react-redux";
import { FeedSharp } from "@mui/icons-material";

const Select = styled("select")(({ theme }) => ({
  padding: "5px",
  marginRight: "20px",
  // ${mobile({ margin: "10px 0" })}
}));
const Option = styled("option")(({ theme }) => ({}));

const Products = ({ cat }) => {
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) => {
        return item.cat.indexOf(cat) >= 0;
      })
    );
  }, [cat, products]);

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box flex={7} p={2}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center">
              <Typography>Sort: </Typography>
              <Select onChange={(e) => setSort(e.target.value)}>
                <Option value="newest">Newest</Option>
                <Option value="asc">Price (asc)</Option>
                <Option value="desc">Price(desc)</Option>
              </Select>
            </Stack>
          </Stack>
          <Grid container columns={10}>
            {" "}
            {/* 10 columns thus each with size 2 = 5 items in a column */}
            {cat
              ? filteredProducts.map((item) => (
                  <Product item={item} key={item._id} />
                ))
              : products
                  .slice(0, 30)
                  .map((item) => <Product item={item} key={item._id} />)}
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default Products;
