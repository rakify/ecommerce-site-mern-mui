import styled from "@emotion/styled";
import { ButtonBase, Link, Paper, Typography } from '@mui/material'

const Img = styled("img")({
    display: "block",
    marginRight: 10,
    height: 40,
    width: 40,
  });
  

const Categories = () => {
  return (
<Paper
  square
  variant="outlined"
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    height: { md: 50, xs: "100%" },
    width: { md: "50%", xs: "100%" },
    pt: 1,
  }}
>
  <Paper
    elevation={0}
    sx={{
      width: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      "&:hover": {
        backgroundColor: "whitesmoke",
      },
    }}
  >
    <Link underline="none" href="/products/tshirt">
      <ButtonBase>
        <Img
          src={
            "https://img.freepik.com/free-vector/front-t-shirt-with-face-tiger-pattern_1308-60478.jpg?t=st=1650723619~exp=1650724219~hmac=2c9448563c870b6ed0ec41fe5ebba21405681980c1fa6e284ac19fd4f761486f&w=740"
          }
        />
        <Typography>Tshirts</Typography>
      </ButtonBase>
    </Link>
  </Paper>
  <Paper
    elevation={0}
    sx={{
      width: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      "&:hover": {
        backgroundColor: "whitesmoke",
      },
    }}
  >
    <Link underline="none" href="/products/fruit">
      <ButtonBase>
        <Img
          src={
            "https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg?t=st=1650726057~exp=1650726657~hmac=c998e3952c1fa24171546f098ec827fb9384cdd57e69474e33bf5c9b88e61aa4&w=1060"
          }
        />
        <Typography>Fruits & Vegetables</Typography>
      </ButtonBase>
    </Link>
  </Paper>
  <Paper
    elevation={0}
    sx={{
      width: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      "&:hover": {
        backgroundColor: "whitesmoke",
      },
    }}
  >
    <Link underline="none" href="/products/electronic">
      <ButtonBase>
        <Img
          src={
            "https://img.freepik.com/free-vector/realistic-house-appliances-set_1284-10167.jpg?t=st=1650729686~exp=1650730286~hmac=3d5de9b0334903f363bf7fc705d2ddcd143fb52d952a52307f1ffdfac8863653&w=826"
          }
        />
        <Typography>Electronics</Typography>
      </ButtonBase>
    </Link>
  </Paper>
  <Paper
    elevation={0}
    sx={{
      width: "100%",
      backgroundColor: (theme) =>
        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      "&:hover": {
        backgroundColor: "whitesmoke",
      },
    }}
  >
    <Link underline="none" href={"#"}>
      <ButtonBase>
        <Img
          src={
            "https://img.freepik.com/free-photo/cocktail-glasses_144627-34955.jpg?t=st=1650729800~exp=1650730400~hmac=fadc523245354c092062c4ebb03b8f64c28fd1cb77c6170d75071d5fd954439d&w=1060"
          }
        />
        <Typography>Beverages</Typography>
      </ButtonBase>
    </Link>
  </Paper>
</Paper>

  )
}

export default Categories