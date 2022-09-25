import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ProductComponent from "../../components/ProductComponent";
import { searchProducts } from "../../redux/apiCalls";

const ProductSearch = ({ query }) => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    searchProducts(query).then((res) =>
      setSearchResults(res)
    );
  }, [query]);
  return (
    <>
      <Typography variant="h3">Search results for {query}</Typography>
      {searchResults.length === 0 ? (
        <Typography>No products found under this query.</Typography>
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
              {searchResults.map((item) => (
                <ProductComponent item={item} key={item._id} />
              ))}
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default ProductSearch;
