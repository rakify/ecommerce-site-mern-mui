import { Avatar, Card, CardHeader, CardMedia } from "@mui/material";
import React from "react";

const Ads = () => {
  return (
    <Card sx={{ maxWidth: 300, maxHeight: 450 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "gray" }} aria-label="recipe">
            Ads
          </Avatar>
        }
      />
      <CardMedia
        component="img"
        image="https://www.coca-cola.com.bd/content/dam/brands/bd/coca-cola/image/updates/77422/web-card-min.jpg"
        alt="Image"
        sx={{ objectFit: "contain" }}
      />
    </Card>
  );
};

export default Ads;
