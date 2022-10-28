import { useEffect, useState } from "react";
import { Box, Grid, Stack, styled, Typography } from "@mui/material";
import Product from "./ProductComponent";
import { useSelector } from "react-redux";
import { getProductsAsCategory, getSellerProducts } from "../redux/apiCalls";

const Products = ({ cartOpen, open, cat, limit, shopName, sort }) => {
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [num, setNum] = useState(15);
  useEffect(() => {
    cat && getProductsAsCategory(cat).then((res) => setFilteredProducts(res));
  }, [cat]);

  useEffect(() => {
    getSellerProducts(shopName).then((res) => setFilteredProducts(res));
  }, [shopName]);

  useEffect(() => {
    sort === "newest" &&
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    sort === "asc" &&
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    sort === "desc" &&
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
  }, [sort]);

  useEffect(() => {
    cartOpen && open
      ? setNum(10)
      : open && !cartOpen
      ? setNum(15)
      : cartOpen && !open
      ? setNum(15)
      : setNum(15);
  }, [cartOpen, open]);

  return (
    <>
      {cat && filteredProducts.length === 0 ? (
        <Typography>No products available yet under this category.</Typography>
      ) : shopName && filteredProducts.length === 0 ? (
        <Typography>No products available yet under this shop.</Typography>
      ) : (
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          columns={{ xs: 5, sm: 10, md: num }}
        >
          {/* columns 5 = 1 product */}
          {cat || shopName
            ? filteredProducts
                .slice(0, limit)
                .map((item) => <Product item={item} key={item._id} />)
            : products
                .slice(0, limit)
                .map((item) => <Product item={item} key={item._id} />)}
        </Grid>
      )}
    </>
  );
};

export default Products;
