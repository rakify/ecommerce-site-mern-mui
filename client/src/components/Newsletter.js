import styled from "@emotion/styled";
import { Button, Stack, TextField, Typography, InputBase } from "@mui/material";

const Newsletter = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ flex: 1 }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Sign Up For 20% Off Your First Order
      </Typography>
      <Typography
        sx={{
          fontWeight: 300,
          mb: "20px",
          textAlign: { md: "center" },
        }}
      >
        Hear Updates (Get updates for offers, promo codes directly in your
        inbox.)
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <input
          placeholder="Your email"
          style={{
            backgroudColor: "lightblue",
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "center",
            height: 40,
            outline: "none",
          }}
        />
        <Button variant="contained" sx={{ width: 100, ml: 1, height: 30 }}>
          Subscribe
        </Button>
      </Stack>
    </Stack>
  );
};

export default Newsletter;
