import Carousel from "react-material-ui-carousel";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardMedia,
  CardActions,
} from "@mui/material";

export default function Offers() {
  const sliderItems = [
    {
      id: 1,
      img: "https://i.postimg.cc/zBtnz2PQ/basket-4567981-1920.png",
      title: "Summer Sale",
      desc: "DON'T COMPROMISE ON STYLE! GET UPTO 60% OFF FOR REGULAR  SUMMER ITEMS.",
      bg: "#ADD8E6",
    },
    {
      id: 2,
      img: "https://i.postimg.cc/QddKtJcG/wiper-2055246-1280.png",
      title: "Household Items",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "#82CAFF",
    },
    {
      id: 3,
      img: "https://i.postimg.cc/NFP8GCLM/children-817368-1920.jpg",
      title: "Kids LOVE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 20% OFF ON KIDS LOVE BRAND.",
      bg: "#ADDFFF",
    },
  ];

  return (
    <>
      <Carousel indicators={false} sx={{ maxWidth: "100%" }}>
        {sliderItems.map((item) => (
          <Card key={item.id}>
            <CardHeader
              title="Ongoing Offers"
              avatar={<Avatar sx={{ bgcolor: "red" }}>NEW</Avatar>}
            />
            <CardMedia
              height="300"
              component="img"
              image={item.img}
              alt="Image"
              sx={{
                objectFit: "contain",
                display: { xs: "none", sm: "block" },
              }}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </CardContent>
            <CardActions>
              <Button>Shop Now</Button>
            </CardActions>
          </Card>
        ))}
      </Carousel>
    </>
  );
}
