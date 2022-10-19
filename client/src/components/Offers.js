import Carousel from "react-material-ui-carousel";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function Offers() {
  const sliderItems = [
    {
      id: 1,
      img: "https://s.alicdn.com/@img/imgextra/i3/O1CN01uiSeBv1O6x2sPJnuu_!!6000000001657-2-tps-990-400.png",
      title: "Summer Sale",
      desc: "DON'T COMPROMISE ON STYLE! GET UPTO 60% OFF FOR REGULAR  SUMMER ITEMS.",
      bg: "#ADD8E6",
    },
    {
      id: 2,
      img: "https://gw.alicdn.com/imgextra/i4/O1CN01w7qrE525ljn6vudjY_!!6000000007567-0-tps-990-400.jpg",
      title: "Household Items",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "#82CAFF",
    },
    {
      id: 3,
      img: "https://s.alicdn.com/@img/imgextra/i3/O1CN01M9x0R41VzdeRW8FYF_!!6000000002724-0-tps-990-400.jpg",
      title: "Kids LOVE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 20% OFF ON KIDS LOVE BRAND.",
      bg: "#ADDFFF",
    },
    {
      id: 4,
      img: "https://s.alicdn.com/@img/imgextra/i2/O1CN01rYC4hI1lJzSxuJUm1_!!6000000004799-2-tps-990-400.png",
      title: "Kids LOVE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 20% OFF ON KIDS LOVE BRAND.",
    },
    {
      id: 5,
      img: "https://s.alicdn.com/@img/imgextra/i2/O1CN01ZM2MjW1hZKHv1l8DM_!!6000000004291-0-tps-990-400.jpg",
      title: "Kids LOVE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 20% OFF ON KIDS LOVE BRAND.",
    },
    {
      id: 6,
      img: "https://s.alicdn.com/@img/imgextra/i1/O1CN01Un39pX1QqrxlUkbBG_!!6000000002028-2-tps-990-400.png",
      title: "Kids LOVE",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 20% OFF ON KIDS LOVE BRAND.",
    },
  ];

  return (
    <>
      <Carousel indicators={false} sx={{ mb: 10, }}>
        {sliderItems.map((item) => (
          <Paper key={item.id} elevation={1}>
            <CardContent
              sx={{
                display: "flex",
              }}
            >
              {/* <Stack
                sx={{
                  flexDirection: "center",
                  justifyContent: "center",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>{" "}
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "black", borderRadius: "50%" }}
                  >
                    Shop Now
                  </Button>
                </CardActions>
              </Stack> */}

              <CardMedia
                component="img"
                image={item.img}
                alt="Image"
                sx={{
                  cursor: "pointer",
                  objectFit: "contain",
                  objectPosition: "60% 100%",
                  width: "100%",
                  height: 250,
                }}
              />
            </CardContent>
          </Paper>
        ))}
      </Carousel>
    </>
  );
}
