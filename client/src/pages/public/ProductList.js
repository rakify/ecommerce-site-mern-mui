import { Container, Stack, styled, Typography } from "@mui/material";
import Products from "../../components/Products";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 20,
}));
const Filter = styled("div")(({ theme }) => ({
  margin: "20px",
  // ${mobile({ margin: "0 20px", display: "flex", flexDirection: "column" })}
}));
const FilterText = styled("span")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "600",
  marginRight: "20px",
  // ${mobile({ marginRight: "0" })}
}));
const Select = styled("select")(({ theme }) => ({
  padding: "10px",
  marginRight: "20px",
  // ${mobile({ margin: "10px 0" })}
}));
const Option = styled("option")(({ theme }) => ({}));

const ProductList = ({ cartOpen, open }) => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [sort, setSort] = useState("newest");
  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Title>{cat.toUpperCase()}</Title>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </Stack>
      <Products
        cat={cat}
        sort={sort}
        limit={30}
        cartOpen={cartOpen}
        open={open}
      />
    </Container>
  );
};

export default ProductList;
