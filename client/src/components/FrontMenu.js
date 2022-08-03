import { Card, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Ads from "./Ads";
import CategoryList from "./CategoryList";
import Offers from "./Offers";

const FrontMenu = () => {
  return (
    <Container maxWidth="xl">
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1,
          mb: 2,
          borderBottom: "10px solid #79A8A9",
          borderLeft: "10px solid #79A8A9",
        }}
      >
        <Stack sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
          <CategoryList />
        </Stack>
        <Stack sx={{ flex: 3 }}>
          <Offers />
        </Stack>
        {/* <Stack sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
          <Ads />
        </Stack> */}
      </Card>
    </Container>
  );
};

export default FrontMenu;
