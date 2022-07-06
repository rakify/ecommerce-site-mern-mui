import { useEffect, useState } from "react";
import { Grid, styled } from "@mui/material";
import Product from "./Product";
import { useSelector } from "react-redux";

const Products = ({ cat, filters, sort }) => {
  const products = useSelector((state) => state.product.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  
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
    <Grid container columns={10}> {/* 10 columns thus each with size 2 = 5 items in a column */}
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 30)
            .map((item) => <Product item={item} key={item._id} />)}
    </Grid>
  );
};

export default Products;
