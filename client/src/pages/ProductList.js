import { styled } from "@mui/material";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled("div")(({ theme }) => ({}));
const Title = styled("h1")(({ theme }) => ({
  margin: "20px",
}));
const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
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

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value.toLowerCase();
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  console.log(cat)
  return (
    <Container>
      <Title>{cat.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Green</Option>
            <Option>Blue</Option>
            <Option>Red</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XXL</Option>
            <Option>XL</Option>
            <Option>L</Option>
            <Option>M</Option>
            <Option>S</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} limit={30} />
    </Container>
  );
};

export default ProductList;
