import { Avatar, Card, CardHeader, CardMedia, Typography } from "@mui/material";
import React from "react";

const Ads = () => {
  return (
    <Card sx={{ minWidth: 300, minHeight: 450 }}>
      <Typography>Your ad here</Typography>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "gray" }} aria-label="recipe">
            Ads
          </Avatar>
        }
      /> */}
      {/* <CardMedia
        component="img"
        image="https://www.coca-cola.com.bd/content/dam/brands/bd/coca-cola/image/updates/77422/web-card-min.jpg"
        alt="Image"
        sx={{ objectFit: "contain" }}
      /> */}
    </Card>
  );
};

export default Ads;
