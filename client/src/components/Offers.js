import styled from "@emotion/styled";
import {
  Announcement,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  Home,
} from "@mui/icons-material";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, ButtonBase, Stack, Typography } from "@mui/material";

export default function Offers() {
  const sliderItems = [
    {
      id: 1,
      img: "https://i.postimg.cc/zBtnz2PQ/basket-4567981-1920.png",
      title: "Summer Sale",
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
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
      desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
      bg: "#ADDFFF",
    },
  ];

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <>
      <Typography variant="h5" align="center">
        Ongoing Offers
      </Typography>
      <Paper>
        <Carousel
          navButtonsAlwaysVisible
          indicatorIconButtonProps={{
            style: {
              padding: "10px", // 1
              color: "#bbb", // 3
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              backgroundColor: "#34568B", // 2
            },
          }}
          indicatorContainerProps={{
            style: {
              marginTop: "50px", // 5
              textAlign: "right", // 4
            },
          }}
        >
          {sliderItems.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: item.bg }}
            >
              <ButtonBase
                sx={{
                  height: 300,
                  width: "100%",
                  margin: 2,
                }}
              >
                <Img src={item.img} />
              </ButtonBase>
              <Stack direction="column">
                <Typography variant="inherit" align="center">
                  {item.title}
                </Typography>
                <Typography variant="subtitle2">{item.desc}</Typography>
                <Button>Shop Now</Button>
              </Stack>
            </Stack>
          ))}
        </Carousel>
      </Paper>
    </>
  );
}
